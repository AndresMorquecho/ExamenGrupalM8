const loandsRepository = require("../repository/loansRepository");
const libroRepository = require("../repository/booksRepository");
async function prestamo(libroPrestado) {
  try {
    return await loandsRepository.createPrestamos(libroPrestado);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  prestamo,

};
