const bcryptjs = require("bcryptjs");
const { response } = require("express");
const generarJWT = require("../helpers/generarJwt");
const Auth = require("../models/auth");
const Persona = require("../models/persona");


const loginUser = async (req, res = response) => {
  const { user, password } = req.body;

  try {
    const usuario = await Auth.findOne({
      where: {
        user: user,
      },
      include: {
        model: Persona,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Error usuario o contraseña incorrectos",
      });
    }

    const verifyPass = bcryptjs.compareSync(password, usuario.password);

    if (!verifyPass) {
      return res.status(404).json({
        ok: false,
        msg: "Error usuario o contraseña incorrectos",
      });
    }
  
    const token = await generarJWT(usuario.persona.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error de Backend",
    });
  }
};

const loginUserRefresh = async (req, res = response) => {
  const { id } = req.usuario;

  try {
    const usuario = await Auth.findOne({
      where: {
        id_persona: id,
      },
      include: {
        model: Persona,
      },
    });

    res.json({
      ok: true,
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error de Backend",
    });
  }
};

module.exports = {
  loginUser,
  loginUserRefresh,
};
