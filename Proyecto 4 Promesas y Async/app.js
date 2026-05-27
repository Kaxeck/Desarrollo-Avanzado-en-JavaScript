// Proyecto 5: Promesas y Async/Await - Simulación de Reserva de Mesas en un Restaurante

// Simulando una base de datos de mesas
const mesasDisponibles = 5; // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Verifica si hay suficientes mesas disponibles para la reserva solicitada.
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve("Mesas disponibles para reservar.");
      } else {
        reject("No hay suficientes mesas disponibles para reservar.");
      }
    }, 2000); // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula el envío de un correo de confirmación con probabilidad de éxito o fracaso.
      if (Math.random() > 0.5) {
        resolve("Correo de confirmación enviado.");
      } else {
        reject("Error al enviar el correo de confirmación.");
      }
    }, 1500); // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    // Verifica la disponibilidad de mesas y envía un correo de confirmación si las mesas están disponibles.
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas); // Llama a la función de verificación
    console.log(disponibilidad); // Muestra el resultado de la verificación
    console.log("Enviando correo de confirmación...");
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(confirmacion); // Muestra el resultado del envío de confirmación
    console.log("Reserva completada exitosamente para", nombreCliente); // Indica que la reserva se ha completado
  } catch (error) {
    console.log("Error:", error); // Maneja los errores en la promesa
  }
}

// Llamada de prueba para hacer una reserva
hacerReserva("Juan Pérez", 6); // Intenta hacer una reserva para 6 personas
