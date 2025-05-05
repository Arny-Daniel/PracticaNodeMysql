
const express = require('express');
const app = express();
const sequelize = require('./database/database');
const routes = require('./routes/routes');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

require('dotenv').config();

app.use('/uploads', express.static('uploads'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Rutas
app.use('/', routes);

// Sincronizar base de datos
sequelize.sync().then(() => console.log('BD conectada'));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

