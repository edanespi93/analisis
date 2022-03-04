const bcryptjs = require("bcryptjs");
const Auth = require("../models/auth");
const Persona = require("../models/persona");

const postPersona = async (req, res) => {
  const { cedula, email } = req.body;

  try {
    const verifyCedula = await Persona.findOne({
      where: {
        cedula: cedula,
      },
    });
    if (verifyCedula) {
      return res.status(400).json({
        ok: false,
        msg: "Cedula ya existe",
      });
    }

    const verifyEmail = await Persona.findOne({
      where: {
        email: email,
      },
    });
    if (verifyEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Correo ya existe",
      });
    }

    const usuario = Persona.build(req.body);
    await usuario.save();

    //encriptar pass
    const salt = bcryptjs.genSaltSync();
    const passwordEncryp = bcryptjs.hashSync(cedula, salt);

    const auth = Auth.build({
      user: cedula,
      password: passwordEncryp,
      id_persona: usuario.id,
    });

    await auth.save();

    res.status(200).json({
      ok: true,
      msg: "Se creo correctamente el usuario...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const editBasic = async (req, res) => {
  const { cedula } = req.body;

  try {
    const usuario = await Persona.findOne({
      where: {
        cedula: cedula,
      },
    });
    await usuario.update(req.body);

    res.status(200).json({
      ok: true,
      msg: "Usuario Actualizado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

const verifyCredential = async (req, res) => {
  const { user, password, newPass } = req.body;

  try {
    const usuario = await Auth.findOne({
      where: {
        user: user,
      },
    });

    const verifyPass = bcryptjs.compareSync(password, usuario.password);
    if (!verifyPass) {
      return res.status(404).json({
        ok: false,
        msg: "La contraseña actual no es correcta",
      });
    }

    const salt = bcryptjs.genSaltSync();
    const passwordEncryp = bcryptjs.hashSync(newPass, salt);

    await usuario.update({
      user: user,
      password: passwordEncryp,
    });

    res.status(200).json({
      ok: true,
      usuario,
      msg: "Credenciales actualizadas correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error del servidor",
    });
  }
};

module.exports = {
  postPersona,
  editBasic,
  verifyCredential,
};
