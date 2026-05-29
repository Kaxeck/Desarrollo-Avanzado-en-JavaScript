// Importamos Zod
const { z } = window.Zod;

// Esquema para validar los datos del formulario
const registerSchema = z.object({
    // Define que el nombre debe ser una cadena no vacía.
    name: z.string().nonempty("El nombre es obligatorio"),
    // Valida que el correo tenga el formato correcto.
    email: z.string().email("El correo electrónico no es válido"),
    // La contraseña debe tener al menos 6 caracteres.
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Capturamos los valores ingresados
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  // Limpiamos cualquier mensaje de error previo.
  document.getElementById("errors").textContent = "";
  try {
    // Validamos los datos usando el esquema de Zod.
    registerSchema.parse(formData);
    alert("¡Registro exitoso!");
  } catch (error) {
    // Si hay errores de validación, los mostramos al usuario.
    const messages = error.issues ?? error.errors ?? [];
    document.getElementById("errors").textContent = messages
      .map((e) => e.message)
      .join(", ");
  }
});
