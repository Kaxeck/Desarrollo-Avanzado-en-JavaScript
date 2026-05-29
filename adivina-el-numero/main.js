import './style.css';
import { z } from 'zod';

// Esquema de validación para la dificultad y el número ingresado
const dificultadForm = z.object({
    // Validar que se seleccione una dificultad válida
    dificultad: z.enum(['facil', 'medio', 'dificil'], {
        errorMap: () => ({ message: 'Selecciona una dificultad válida' }),
    }),
    // Validar que el número sea un entero positivo
    numero: z.number().refine(Number.isInteger, { message: 'El número debe ser un entero' }).positive({ message: 'El número debe ser un entero positivo' })
});

let numeroSecreto = null;
const inputNumero = document.getElementById('numero');
const botonAdivinar = document.getElementById('adivinar');
const dificultad = document.getElementById('dificultad-form');
const mensaje = document.getElementById('mensaje');
const mensajeInicial = document.getElementById('mensaje-inicial');
const btnConfirmar = document.getElementById('confirmar-dificultad');
const btnReiniciar = document.getElementById('reiniciar');
let maxIntentos = 10;
let intentosRestantes = maxIntentos;

// Deshabilitar el input y el botón de adivinar hasta que se confirme la dificultad
if (botonAdivinar) botonAdivinar.disabled = true;
if (inputNumero) inputNumero.disabled = true;

// Función para manejar el evento de adivinar
botonAdivinar.addEventListener('click', () => {
    const numeroJugador = parseFloat(inputNumero.value);
    const seleccionadoElem = document.querySelector('input[name="dificultad"]:checked');
    if (!seleccionadoElem) {
        const err = 'Por favor, selecciona una dificultad.';
        alert(err);
        if (mensaje) mensaje.textContent = err;
        if (mensajeInicial) mensajeInicial.textContent = err;
        return;
    }
    const dificultadSeleccionada = seleccionadoElem.value;
    // Determinar el rango máximo según la dificultad seleccionada
    let maxRange = 100;
    if (dificultadSeleccionada === 'medio') maxRange = 1000;
    if (dificultadSeleccionada === 'dificil') maxRange = 10000;

    // Validación con Zod para asegurar que la dificultad y el número ingresado son válidos
    try {
        dificultadForm.parse({ dificultad: dificultadSeleccionada, numero: numeroJugador });
    } catch (error) {
        const messages = error.issues ?? error.errors ?? [];
        const textoError = Array.isArray(messages) ? messages.map((e) => e.message).join(', ') : (error.message || 'Valor inválido');
        alert(textoError);
        if (mensaje) mensaje.textContent = textoError;
        if (mensajeInicial) mensajeInicial.textContent = textoError;
        return;
    }
    // Validar que el número ingresado esté dentro del rango permitido
    if (numeroJugador < 1 || numeroJugador > maxRange) {
        mensaje.textContent = `Por favor, ingresa un número válido entre 1 y ${maxRange}.`;
        return;
    }
    // Validar que el número secreto ya ha sido generado
    if (numeroJugador === numeroSecreto) {
        mensaje.textContent = '¡Felicidades! ¡Adivinaste el número!';
        botonAdivinar.disabled = true;
        inputNumero.disabled = true;
        return;
    }

    // Intento incorrecto decrementar y mostrar pista
    intentosRestantes--;
    if (numeroJugador < numeroSecreto) {
        mensaje.textContent = `El número es más alto. Intentos restantes: ${intentosRestantes}`;
    } else {
        mensaje.textContent = `El número es más bajo. Intentos restantes: ${intentosRestantes}`;
    }

    // Verificar si se acabaron los intentos
    if (intentosRestantes <= 0) {
        mensaje.textContent = `Se te acabaron los intentos. El número era ${numeroSecreto}.`;
        botonAdivinar.disabled = true;
        inputNumero.disabled = true;
    }
});

// Función para aplicar la dificultad seleccionada y generar el número secreto
function applyDifficulty(dificultadSeleccionada) {
    let nuevaMaxIntentos;
    switch (dificultadSeleccionada) {
        case 'facil':
            nuevaMaxIntentos = 10;
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            break;
        case 'medio':
            nuevaMaxIntentos = 20;
            numeroSecreto = Math.floor(Math.random() * 1000) + 1;
            break;
        case 'dificil':
            nuevaMaxIntentos = 30;
            numeroSecreto = Math.floor(Math.random() * 10000) + 1;
            break;
        default:
            nuevaMaxIntentos = 10;
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
    }
    // actualizar intentos restantes según la nueva dificultad
    maxIntentos = nuevaMaxIntentos;
    intentosRestantes = maxIntentos;
    mensaje.textContent = `Has seleccionado ${dificultadSeleccionada}. Tienes ${maxIntentos} intentos para adivinar el número.`;
    inputNumero.value = '';
    // Reiniciar o activar el juego cuando se cambia la dificultad
    if (botonAdivinar) botonAdivinar.disabled = false;
    if (inputNumero) inputNumero.disabled = false;
}

// Evento para manejar el cambio de dificultad
dificultad.addEventListener('change', () => {
    const dificultadSeleccionada = document.querySelector('input[name="dificultad"]:checked')?.value || 'facil';
    // No aplicar automáticamente: mostrar mensaje y pedir confirmación
    if (mensajeInicial) mensajeInicial.textContent = `Has seleccionado ${dificultadSeleccionada}. Pulsa "Confirmar dificultad" para iniciar.`;
    // asegurar que el botón confirmar esté visible
    if (btnConfirmar) btnConfirmar.style.display = 'inline-block';
    if (btnReiniciar) btnReiniciar.style.display = 'none';
    // mantener inputs deshabilitados hasta confirmar
    if (botonAdivinar) botonAdivinar.disabled = true;
    if (inputNumero) inputNumero.disabled = true;
});

// Evento para confirmar la dificultad seleccionada
if (btnConfirmar) {
    btnConfirmar.addEventListener('click', () => {
        const seleccionado = document.querySelector('input[name="dificultad"]:checked');
        if (!seleccionado) { alert('Selecciona una dificultad.'); return; }
        applyDifficulty(seleccionado.value);
        // ocultar confirmar y mostrar reiniciar
        btnConfirmar.style.display = 'none';
        if (btnReiniciar) btnReiniciar.style.display = 'inline-block';
        // desactivar radios para bloquear la dificultad
        document.querySelectorAll('input[name="dificultad"]').forEach(r => r.disabled = true);
    });
}

// Evento para reiniciar el juego
if (btnReiniciar) {
    btnReiniciar.addEventListener('click', () => {
        const seleccionado = document.querySelector('input[name="dificultad"]:checked')?.value || 'facil';
        applyDifficulty(seleccionado);
        // mostrar confirmar y ocultar reiniciar
        if (btnConfirmar) btnConfirmar.style.display = 'inline-block';
        btnReiniciar.style.display = 'none';
        // reactivar los radios para permitir cambiar la dificultad
        document.querySelectorAll('input[name="dificultad"]').forEach(r => r.disabled = false);
    });
}

