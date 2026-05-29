// Renderiza la información de los planetas en la página.
const grid = document.getElementById('grid');

// Carga los datos de los planetas desde el archivo JSON.
axios.get('planetas.json')
  .then(function (resp) {
    const planetas = resp.data;

    // Itera sobre cada planeta y crea una tarjeta para mostrar su información.
    planetas.forEach(function (p) {
      const card = document.createElement('article');
      card.className = 'card';

      const img = document.createElement('img');
      img.alt = p.nombre;

      const body = document.createElement('div');
      body.className = 'body';

      const h3 = document.createElement('h3');
      h3.textContent = p.nombre;

      const desc = document.createElement('p');
      desc.textContent = p.descripcion;

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = 'Descubierto en: ' + p.descubiertoEn;

      body.appendChild(h3);
      body.appendChild(desc);
      body.appendChild(meta);

      card.appendChild(img);
      card.appendChild(body);
      grid.appendChild(card);

      // Si el planeta tiene un ID de NASA, intenta cargar su imagen.
      axios.get(`https://images-api.nasa.gov/asset/${p.nasaId}`)
        .then(function (res) {
          const items = res.data.collection.items;
          const image = items.find(function (item) {
            return item.href && (item.href.endsWith('.jpg') || item.href.endsWith('.png') || item.href.endsWith('.jpeg'));
          });

          // Si se encuentra una imagen, se asigna al elemento img.
          if (image) {
            img.src = image.href;
          }
        })
        // Si no se puede cargar la imagen, se muestra un mensaje en la consola.
        .catch(function () {
          console.log('No se pudo cargar imagen para ' + p.nombre);
        });
    });
  })

  // Si no se pueden cargar los datos de los planetas, se muestra un mensaje en la página y en la consola.
  .catch(function (err) {
    grid.textContent = 'No se pudo cargar la información de planetas.';
    console.error(err);
  });
