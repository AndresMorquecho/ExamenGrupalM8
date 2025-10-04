const { addLibro, EditLibro,deleteBook } = require("../repository/booksRepository");

async function createLibro(newLibro) {
  try {
    return await addLibro(newLibro);
  } catch (error) {
    throw new Error(error.message);
  }
}
async function updateLibro(id, libroEdit) {
  try {
    return await EditLibro(id, libroEdit);
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteLibro(id, libroEdit) {
  try {
    return await deleteBook(id, libroEdit);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createLibro,
  updateLibro,
  deleteLibro,
};
