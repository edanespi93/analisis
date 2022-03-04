const { Router } = require("express");
const { check } = require("express-validator");
const {
  postPersona,
  updateCredential,
  editBasic,
  verifyCredential,
} = require("../controllers/persona");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJwt");

const router = Router();
router.post(
  "/",
  [
    check("nombres", "Los nombres son requerido").not().isEmpty(),
    check("apellidos", "El apellido es requerido").not().isEmpty(),
    check("cedula", "La cedula es requerida").not().isEmpty(),
    check("telefono", "El telefono es requerido").not().isEmpty(),
    check("email", "Email es requerido ").isEmail(),
    validarCampos,
  ],
  postPersona
);
router.put(
  "/basic",
  [
    validarJWT,
    check("nombres", "Los nombres son requerido").not().isEmpty(),
    check("apellidos", "El apellido es requerido").not().isEmpty(),
    check("cedula", "La cedula es requerida").not().isEmpty(),
    check("telefono", "El telefono es requerido").not().isEmpty(),
    check("email", "Email es requerido ").isEmail(),
    validarCampos,
  ],
  editBasic
);

router.put(
  "/updateCredential",
  [
    validarJWT,
    check("password", "Los password es requerido").not().isEmpty(),
    validarCampos,
  ],
  verifyCredential
);

module.exports = router;
