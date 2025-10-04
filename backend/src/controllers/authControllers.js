const authServices = require("../services/authServices");
const blackListRepository = require("../repository/blackListRepository");
async function register(req, res) {
  try {
    const usuario = await authServices.register(req.body);

    res.json({ message: "Registro exitoso", usuario: usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const token = await authServices.login(req.body);
    res.json({ message: "Login Exitoso", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function logout(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  try {
    await blackListRepository.agregarToken(token);
    res.json({ message: "Logout Exitoso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {
  register,
  login,
  logout,
};
