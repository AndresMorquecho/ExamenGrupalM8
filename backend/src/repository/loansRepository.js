const { PrismaClient } = require("@prisma/client"); // Importa el cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient(); // Crea una instancia del cliente para ejecutar consultas

async function createPrestamos(prestamo) {
  await prisma.historial.create({ data: prestamo });
  return await prisma.prestamo.create({ data: prestamo });
}

async function estaDisponible(idLibro) {
  const libro = await prisma.libro.findUnique({
    where: { id: parseInt(idLibro) },
  });

  // Si no existe el libro, o no está disponible, devuelve false
  if (!libro || !libro.disponible) {
    return false;
  }

  return true;
}

async function libroPrestado(idLibro) {
  await prisma.libro.update({
    where: { id: idLibro },
    data: { disponible: false },
  });
}

async function devolverLibro(idPrestamo, idUsuario) {
  const prestamo = await prisma.prestamo.findUnique({
    where: { id: idPrestamo },
  });

  if (!prestamo || prestamo.usuarioId !== idUsuario) {
    throw new Error("El préstamo no existe o no pertenece al usuario");
  }

  await prisma.prestamo.update({
    where: { id: idPrestamo },
    data: { fechaDevolucion: new Date() },
  });

  await prisma.historial.update({
    where: { id: idPrestamo },
    data: { fechaDevolucion: new Date() },
  });

  await prisma.libro.update({
    where: { id: prestamo.libroId },
    data: { disponible: true },
  });
}

async function historialPrestamo(idUsuario) {
  const prestamos = await prisma.prestamo.findMany({
    where: { usuarioId: idUsuario },
    include: {
      libro: true,
      usuario: true,
    },
  });

  const historial = await prisma.historial.findMany({
    where: { usuarioId: idUsuario },
    include: {
      libro: true,
      usuario: true,
    },
  });

  return { prestamos, historial };
}
module.exports = {
  createPrestamos,
  estaDisponible,
  libroPrestado,
  devolverLibro,
  historialPrestamo,
};
