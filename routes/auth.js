const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, loginUserRefresh } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJwt");

const router = Router();

router.post(
  "/login",
  [
    check("user", "El campo esta vacio").not().isEmpty(),
    check("password", "El campo esta vacio").not().isEmpty(),
    validarCampos,
  ],
  loginUser
);

router.post("/relogin", validarJWT, loginUserRefresh);

module.exports = router;
