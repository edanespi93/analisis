const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { Persona } = require("../models/index2.js");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay  token en la petición",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Persona.findByPk(id);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido - usuario no existe",
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
