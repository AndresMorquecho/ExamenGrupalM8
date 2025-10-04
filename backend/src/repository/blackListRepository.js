const { PrismaClient } = require("@prisma/client"); // Importa el cliente de Prisma para interactuar con la base de datos
const prisma = new PrismaClient(); // Crea una instancia del cliente para ejecutar consultas

async function agregarToken(token) {
  await prisma.tokenRevocado.create({ data: { token: token } });
}

async function esTokenRevocado(token) {
  return prisma.tokenRevocado.findUnique({ where: { token } });
}

module.exports = {
  agregarToken,
  esTokenRevocado,
};
