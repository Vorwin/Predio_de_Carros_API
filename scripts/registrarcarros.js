// Obtener referencias a los elementos del formulario
const marcaInput = document.getElementById('marca');
const lineaInput = document.getElementById('Linea');
const yearInput = document.getElementById('year');
const precioInput = document.getElementById('precio');
const colorInput = document.getElementById('color');
const kilometrajeInput = document.getElementById('kilometraje');
const transmisionInput = document.getElementById('transmision');
const motorInput = document.getElementById('motor');
const tipoInput = document.getElementById('tipo');
const urlImagenInput = document.getElementById('urlImagen');
const btnAgregar = document.getElementById('btn_agregar');

// URL de la API
const apiUrl = 'http://localhost:3000';

// Manejar el evento de envío del formulario
btnAgregar.addEventListener('click', function(event) {
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const marca = marcaInput.value;
  const linea = lineaInput.value;
  const year = yearInput.value;
  const precio = precioInput.value;
  const color = colorInput.value;
  const kilometraje = kilometrajeInput.value;
  const transmision = transmisionInput.value;
  const motor = motorInput.value;
  const tipo = tipoInput.value;
  const urlImagen = urlImagenInput.value;

  // Crear un objeto con los datos del carro
  const carroData = {
    marca: marca,
    linea: linea,
    ano: year,
    precio: precio,
    color: color,
    kilometraje: kilometraje,
    transmision: transmision,
    cilindrada: motor,
    tipo: tipo,
    fotos: [urlImagen]
  };

  // Realizar una solicitud POST a la API para agregar el carro
  fetch(`${apiUrl}/vehiculos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carroData)
  })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta de la API
      if (data._id) {
        // Carro agregado exitosamente
        alert('Carro agregado exitosamente');
        // Limpiar los campos del formulario
        marcaInput.value = '';
        lineaInput.value = '';
        yearInput.value = '';
        precioInput.value = '';
        colorInput.value = '';
        kilometrajeInput.value = '';
        transmisionInput.value = '';
        motorInput.value = '';
        tipoInput.value = '';
        urlImagenInput.value = '';
      } else {
        // Error al agregar el carro
        alert('Error al agregar el carro. Por favor, intenta nuevamente.');
      }
    })
    .catch(error => {
      console.error('Error al agregar el carro:', error);
      alert('Error al agregar el carro. Por favor, intenta nuevamente.');
    });
});