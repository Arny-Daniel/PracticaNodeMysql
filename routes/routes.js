const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');
const Editorial = require('../models/editorial');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Listar libros
router.get('/', async (req, res) => {
  const libros = await Libro.findAll({ include: Editorial });
  res.render('libros', { libros });
});

// Formulario agregar libro
router.get('/agregar', async (req, res) => {
  const editoriales = await Editorial.findAll();
  res.render('agregarLibro', { editoriales });
});

// Agregar libro
router.post('/agregar', upload.single('imagen'), async (req, res) => {
  const { titulo, autor, anio, EditorialId } = req.body;
  const imagen = req.file ? req.file.filename : null;
  await Libro.create({ titulo, autor, anio, imagen, EditorialId });
  res.redirect('/');
});

// Editar libro
router.get('/editar/:id', async (req, res) => {
  const libro = await Libro.findByPk(req.params.id);
  const editoriales = await Editorial.findAll();
  res.render('editarLibro', { libro, editoriales });
});

router.post('/editar/:id', upload.single('imagen'), async (req, res) => {
  const { titulo, autor, anio, EditorialId } = req.body;
  const libro = await Libro.findByPk(req.params.id);
  libro.titulo = titulo;
  libro.autor = autor;
  libro.anio = anio;
  libro.EditorialId = EditorialId;
  if (req.file) libro.imagen = req.file.filename;
  await libro.save();
  res.redirect('/');
});

// Eliminar libro
router.get('/eliminar/:id', async (req, res) => {
  await Libro.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

// Listar editoriales
router.get('/editoriales', async (req, res) => {
  const editoriales = await Editorial.findAll();
  res.render('editoriales', { editoriales });
});

// Agregar editorial
router.post('/editoriales', async (req, res) => {
  const { nombre } = req.body;
  await Editorial.create({ nombre });
  res.redirect('/editoriales');
});

module.exports = router;
