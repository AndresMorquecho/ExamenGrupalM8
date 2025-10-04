const { PrismaClient } = require("@prisma/client"); // Importa el cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient(); // Crea una instancia del cliente para ejecutar consultas

async function getLibros() {
  return await prisma.libro.findMany();
}

async function addLibro(newLibro) {
  return await prisma.libro.create({ data: newLibro });
}
async function EditLibro(id, libroEdit) {
  try {
    const idParser = parseInt(id);

    if (isNaN(idParser)) {
      throw new Error("Error el ID debe ser un valor numerico");
    }

    const { id: _, ...libro } = libroEdit;
    return await prisma.libro.update({ where: { id: idParser }, data: libro });
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteBook(id) {
  try {
    const idParser = parseInt(id);

    if (isNaN(idParser)) {
      throw new Error("Error el ID debe ser un valor numerico");
    }

    return await prisma.libro.delete({ where: { id: idParser } });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getLibros,
  addLibro,
  EditLibro,
  deleteBook,
};
