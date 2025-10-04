const express = require("express");
const router = express.Router();
const loansControllers = require("../controllers/loansController");
const { validarToken } = require("../middlewares/authMiddleware");

router.post("/loans", validarToken, loansControllers.prestamo);
router.put("/loans/:id/return", validarToken, loansControllers.devolver);
router.get("/loans/history", validarToken, loansControllers.historial);

module.exports = router;

