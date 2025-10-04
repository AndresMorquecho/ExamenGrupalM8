const { PrismaClient } = require("@prisma/client"); 
const prisma = new PrismaClient(); 

async function obtenerPorEmail(email) {
  return await prisma.usuario.findUnique({ where: { email } });
}

async function crearUsuario(newUser) {
  return await prisma.usuario.create({ data:  newUser  });
}



module.exports = {
  obtenerPorEmail,
  crearUsuario,
};
