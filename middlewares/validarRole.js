const { Rol } = require("../models/index2.js");

const validarRole = async (req, res, next) => {
  const { id_rol } = req.usuario;
  const rolUser = await Rol.findByPk(id_rol);

  if (rolUser.rol !== "ADMIN") {
    return res.status(404).json({
      ok: false,
      msg: "El usuario no tiene permitida esta operación",
    });
  }
  next();
};

module.exports = { validarRole };
