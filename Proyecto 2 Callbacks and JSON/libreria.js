// Json de la biblioteca
let biblioteca = {
    libros: [
        {
            "titulo": "Cien Años de Soledad",
            "autor": "Gabriel García Márquez",
            "genero": "Realismo Mágico",
            "estado": true
        },
        {
            "titulo": "El Gran Gatsby",
            "autor": "F. Scott Fitzgerald",
            "genero": "Clásico",
            "estado": false
        },
    ],
}

// Funciones para manejar la biblioteca
function leerDatos (callback) {
    // Simulamos una lectura de datos con un retraso
    setTimeout(() => {
        // Devolvemos los datos de la biblioteca a través del callback
        callback(biblioteca);
    }, 1000);
}

// Función para agregar un nuevo libro a la biblioteca
function agregarLibro(titulo, autor, genero, estado) {
    // Simulamos una operación de escritura con un retraso
    setTimeout(() => {
        console.log(`Agregando el libro "${titulo}" a la biblioteca...`);
        // Agregamos el nuevo libro al array de libros
        biblioteca.libros.push({ titulo, autor, genero, estado });
    }, 1000);
}

// Función para actualizar el estado de un libro
function actualizarEstado(titulo, estado) {
    // Simulamos una operación de actualización con un retraso
    setTimeout(() => {
        console.log(`Actualizando el estado del libro "${titulo}"...`);
        // Buscamos el libro por su título y actualizamos su estado
        const libro = biblioteca.libros.find(libro => libro.titulo === titulo);
        // Si el libro se encuentra, actualizamos su estado
        if (libro) {
            libro.estado = estado;
            console.log(`Estado del libro "${titulo}" actualizado a ${estado ? "Disponible" : "No Disponible"}.`);
        } 
        // Si el libro no se encuentra, mostramos un mensaje de error
        else {
            console.log(`Libro "${titulo}" no encontrado.`);
        }
    }, 1000);
}

// Función para mostrar los libros disponibles en la biblioteca
function mostrarLibros() {
    // Simulamos una operación de lectura con un retraso
    leerDatos((datos) => {
    console.log("Libros disponibles en la biblioteca:");
    // Iteramos sobre el array de libros y mostramos su información
    datos.libros.forEach(libro => {
        console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}, Género: ${libro.genero}, Estado: ${libro.estado ? "Disponible" : "No Disponible"}`);
    });
    });
}

// Ejemplo de uso
// Mostrar los libros disponibles inicialmente
mostrarLibros(biblioteca);

// Agregar un nuevo libro y mostrar la lista actualizada
agregarLibro("Don Quijote de la Mancha", "Miguel de Cervantes", "Novela", true);

// Actualizar el estado de un libro a disponible
actualizarEstado("El Gran Gatsby", true);

// Actualizar el estado de otro libro a no disponible
actualizarEstado("Cien Años de Soledad", false);

// Mostrar los libros disponibles después de las actualizaciones
mostrarLibros(biblioteca);