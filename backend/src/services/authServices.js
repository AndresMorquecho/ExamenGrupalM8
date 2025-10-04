const bcrypt = require("bcrypt"); // Importa la librería bcrypt para encriptar contraseñas
const userRepository = require("../repository/userRepository"); // Importa el repositorio que accede a la base de datos
const saltRounds = 10; // Define el número de rondas de encriptación para bcrypt (más seguro = más lento)

// Registro usuario credenciales - services
async function register(data) {
  const usuario = await userRepository.obtenerPorEmail(data.email);

  if (usuario) {
    throw new Error(
      "Ya existe registrado un usuario con el correo: " + data.email
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const newUser = {
    ...data,
    password: hashedPassword,
  };

  await userRepository.crearUsuario(newUser);

  return newUser;
}

// login services

const jwt = require("jsonwebtoken");
const jwtSecrete = process.env.JWT_SECRET;
const secrete_key = jwtSecrete;

async function login(dataUser) {
  const usuario = await userRepository.obtenerPorEmail(dataUser.email);

  if (!usuario)
    throw new Error("El correo ingresado no exite:" + dataUser.email);

  const contraseniaValida = await bcrypt.compare(
    dataUser.password,
    usuario.password
  );

  if (!contraseniaValida) throw new Error("Contraeña invalida");
  const payload = { id: usuario.id, email: usuario.correo, rol: usuario.rol };

  const token = jwt.sign(payload, secrete_key, { expiresIn: "1h" });

  return token;
}

module.exports = {
  register,
  login,
};
