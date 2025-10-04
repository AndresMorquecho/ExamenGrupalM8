const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksControlles");
const { validarToken } = require("../middlewares/authMiddleware");
const { autorizarRoles } = require("../middlewares/rolMiddleware");

router.get("/books",validarToken, booksController.getLibros);
router.post(
  "/books",
  validarToken,
  autorizarRoles("Admin"),
  booksController.createLibros
);
router.put(
  "/books/:id",
  validarToken,
  autorizarRoles("Admin"),
  booksController.updateLibro
);
router.delete(
  "/books/:id",
  validarToken,
  autorizarRoles("Admin"),
  booksController.deleteLibro
);


module.exports = router;
