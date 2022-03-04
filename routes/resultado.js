const { Router } = require("express");
const { check } = require("express-validator");
const {
  upload,
  uploadFile,
  obtenerResultados,
} = require("../controllers/resultado");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJwt");
const { validarRole } = require("../middlewares/validarRole");

const router = Router();

router.post("/", validarJWT, validarRole, upload, uploadFile);

router.get("/listar", validarJWT, obtenerResultados);

module.exports = router;
