const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());


// URL de conexión a tu base de datos de MongoDB
const mongoURL = 'mongodb+srv://coorsa:coorsa022@cluster0.lhqyl0r.mongodb.net/';

// Configuración de middleware
app.use(express.json());

// Conexión a MongoDB utilizando Mongoose
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Definición del esquema de Usuario utilizando Mongoose
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  contrasena: String,
  rol: {
    type: String,
    enum: ['administrador', 'cliente'],
    default: 'cliente'
  }
});


// Definición del esquema de Vehículo utilizando Mongoose
const vehiculoSchema = new mongoose.Schema({
    marca: String,
    linea: String,
    ano: Number,
    precio: Number,
    color: String,
    kilometraje: Number,
    transmision: String,
    cilindrada: Number,
    tipo: String,
    fotos: [String],
  });

// Creación del modelo de Vehículo
const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);


// Endpoint para registrar un nuevo usuario
app.post('/usuarios', async (req, res) => {
  try {
    const usuarioData = req.body;
    const nuevoUsuario = new Usuario(usuarioData);
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Endpoint para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Endpoint para registrar un nuevo vehículo 
app.post('/vehiculos', async (req, res) => {
  try {
    const vehiculoData = req.body;
    const nuevoVehiculo = new Vehiculo(vehiculoData);
    const vehiculoGuardado = await nuevoVehiculo.save();
    res.status(201).json(vehiculoGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el vehículo' });
  }
});

// Endpoint para obtener todos los vehículos 
app.get('/vehiculos', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vehículos' });
  }
});

// Endpoint para obtener un vehículo por ID 
app.get('/vehiculos/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (vehiculo) {
      res.json(vehiculo);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vehículo' });
  }
});

// Endpoint para actualizar un vehículo por ID 
app.put('/vehiculos/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (vehiculo) {
      res.json(vehiculo);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
});

// Endpoint para eliminar un vehículo por ID 
app.delete('/vehiculos/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (vehiculo) {
      res.json(vehiculo);
    } else {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
});

// Endpoint para buscar vehículos por marca
app.get('/vehiculos/marca/:marca', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ marca: req.params.marca });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por marca' });
    }
  });
  
  // Endpoint para buscar vehículos por línea
  app.get('/vehiculos/linea/:linea', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ linea: req.params.linea });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por línea' });
    }
  });
  
  // Endpoint para buscar vehículos por año
  app.get('/vehiculos/ano/:ano', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ ano: parseInt(req.params.ano) });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por año' });
    }
  });
  
  // Endpoint para buscar vehículos por precio
  app.get('/vehiculos/precio/:precio', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ precio: parseInt(req.params.precio) });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por precio' });
    }
  });

  // Endpoint para buscar vehículos por color
  app.get('/vehiculos/color/:color', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ color: req.params.color });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por color' });
    }
  });

  // Endpoint para buscar vehículos por cilindrada
  app.get('/vehiculos/cilindrada/:cilindrada', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ cilindrada: parseInt(req.params.cilindrada) });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por cilindrada' });
    }
  });
  
  // Endpoint para buscar vehículos por kilometraje
  app.get('/vehiculos/kilometraje/:kilometraje', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ kilometraje: parseInt(req.params.kilometraje) });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por kilometraje' });
    }
  });
  
  // Endpoint para buscar vehículos por transmisión
  app.get('/vehiculos/transmision/:transmision', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ transmision: req.params.transmision });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por transmisión' });
    }
  });
  
  // Endpoint para buscar vehículos por tipo
  app.get('/vehiculos/tipo/:tipo', async (req, res) => {
    try {
      const vehiculos = await Vehiculo.find({ tipo: req.params.tipo });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los vehículos por tipo' });
    }
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});