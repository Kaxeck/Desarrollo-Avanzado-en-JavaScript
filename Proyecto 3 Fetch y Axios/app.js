// Implementacion de las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

// Función para realizar una solicitud GET a la API de Rick and Morty utilizando Fetch
fetchBtn.addEventListener('click', () => {
    // Realizamos una solicitud GET a la API de Rick and Morty utilizando Fetch
    fetch('https://rickandmortyapi.com/api/character')
    // Verificamos si la respuesta es exitosa
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    // Llamar a la función para renderizar los personajes en el contenedor
    .then(data => {
        renderCharacters(data.results);
    })
    // Manejar errores
    .catch(error => {
        console.error('Error:', error);
        dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Implementacion de las Solicitudes con Axios
const axiosBtn = document.getElementById('axios-btn');

// Función para realizar una solicitud GET a la API de Rick and Morty utilizando Axios
axiosBtn.addEventListener('click', () => {
    // Realizamos una solicitud GET a la API de Rick and Morty utilizando Axios
    axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
        const data = response.data;
        // Llamar a la función para renderizar los personajes en el contenedor
        renderCharacters(data.results);
    })
    // Manejar errores
    .catch(error => {
        console.error('Error:', error);
        dataContainer.textContent = 'Hubo un error al obtener los datos.';
    });
});

// Función para renderizar los personajes en el contenedor
function renderCharacters(characters) {
    // Limpiar el contenedor antes de agregar nuevos personajes
    dataContainer.innerHTML = '';
    // Iterar sobre los personajes y crear elementos para mostrarlos
    characters.forEach(character => {
        // Crear un elemento div para cada personaje y agregar su información
        const characterElement = document.createElement('div');
        // Agregar el nombre y la imagen del personaje al elemento div
        characterElement.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="${character.name}">`;
        // Agregar el elemento del personaje al contenedor de datos
        dataContainer.appendChild(characterElement);
    });
}