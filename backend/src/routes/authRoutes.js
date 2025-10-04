const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { validarToken } = require("../middlewares/authMiddleware");
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", validarToken, authController.logout);

module.exports = router;
