document
            .getElementById("registroEvento")
            .addEventListener("submit", function (event) {
                event.preventDefault(); // Evita el envío automático del formulario

                // Variables
                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const telefono = document.getElementById("telefono").value;
                const intereses = document.querySelectorAll(
                    'input[name="intereses"]:checked',
                );
                const horario = document.querySelector(
                    'input[name="horario"]:checked',
                );
                const fecha = document.getElementById("fecha").value;
                const hora = document.getElementById("hora").value;

                // Validaciones básicas
                if (
                    !nombre ||
                    !correo ||
                    !telefono ||
                    intereses.length === 0 ||
                    !horario ||
                    !fecha ||
                    !hora
                ) {
                    alert("Por favor, completa todos los campos obligatorios.");
                    return;
                }

                // Validación de formato de correo electrónico
                else if (!/\S+@\S+\.\S+/.test(correo)) {
                    alert("Por favor, ingresa un correo electrónico válido.");
                    return;
                }

                // Validación de formato de número de teléfono (solo dígitos, mínimo 7 caracteres)
                else if (!/^\d{7,}$/.test(telefono)) {
                    alert("Por favor, ingresa un número de teléfono válido (solo dígitos, mínimo 7 caracteres).");
                    return;
                }
                
                // Validación de fecha (no permitir fechas pasadas)
                else if (new Date(fecha) < new Date()) {
                    alert("Por favor, selecciona una fecha futura.");
                    return;
                }

                // Si todo está bien
                alert("Registro exitoso. ¡Gracias por registrarte!");
            });