const loansServices = require("../services/loansServices");
const loandsRepository = require("../repository/loansRepository");

async function prestamo(req, res) {
  const idUsuario = req.usuario.id;
  const idLibro = req.body.libroId;

  const libroPrestado = {
    usuarioId: idUsuario,
    libroId: idLibro,
  };

  try {
    const disponible = await loandsRepository.estaDisponible(idLibro);
    if (!disponible) throw new Error("El libro no existe o no esta disponible");
    const prestamos = await loansServices.prestamo(libroPrestado);
    await loandsRepository.libroPrestado(idLibro);
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function devolver(req, res) {
  const idPrestamo = req.params.id;
  const idUsuario = req.usuario.id;
  try {
    await loandsRepository.devolverLibro(
      parseInt(idPrestamo),
      parseInt(idUsuario)
    );

    res.json({ message: "Libro devuelto con exito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function historial(req, res) {
  const idUsuario = req.usuario.id;
  try {
    const historialusuarios = await loandsRepository.historialPrestamo(
      parseInt(idUsuario)
    );
    res.json(historialusuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  prestamo,
  devolver,
  historial,
};
