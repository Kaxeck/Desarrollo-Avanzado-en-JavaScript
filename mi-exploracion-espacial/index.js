const cowsay = require('cowsay');
const planetas = require('./planetas');

// Muestra un mensaje de bienvenida usando cowsay
console.log(cowsay.say({
  text: 'Reporte de exploracion espacial',
}));

// Itera sobre los planetas y muestra su información
planetas.forEach(planeta => {
  console.log(cowsay.say({
    text: `Planeta ${planeta.nombre}`,
  }));
  console.log(`Descripción: ${planeta.descripcion}`);
  console.log(`Descubierto en: ${planeta.descubiertoEn}`);
  console.log('---');
});