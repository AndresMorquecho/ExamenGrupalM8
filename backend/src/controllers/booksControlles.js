const booksRepository = require("../repository/booksRepository");
const booksServices = require("../services/booksServices");

async function getLibros(req, res) {
  try {
    const libros = await booksRepository.getLibros();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createLibros(req, res) {
  const newLibro = req.body;

  try {
    const libro = await booksServices.createLibro(newLibro);
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function updateLibro(req, res) {
  const libroEdit = req.body;
  const { id } = req.params;

  try {
    const libro = await booksServices.updateLibro(id, libroEdit);
    res.json({ message: "Libro editado con exito", libro: libro });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function deleteLibro(req, res) {
  const libroDelete = req.body;
  const { id } = req.params;

  try {
    await booksServices.deleteLibro(id, libroDelete);
    res.json({ message: "Libro eliminado con exito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getLibros,
  createLibros,
  updateLibro,
  deleteLibro,
};
