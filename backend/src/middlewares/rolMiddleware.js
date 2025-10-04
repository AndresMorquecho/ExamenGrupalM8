function autorizarRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const usuario = req.usuario;

    if (!usuario) return res.status(401).json({ message: "No autenticado" });
    if (!rolesPermitidos.includes(usuario.rol))
      return res.status(403).json({ message: "No autorizado" });
    next();
  };
}

module.exports = {
  autorizarRoles,
};
