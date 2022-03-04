const Auth = require("./auth.js");
const Persona = require("./persona.js");
const Resultado = require("./resultado.js");
const Rol = require("./rol.js");

Persona.belongsTo(Rol, { foreignKey: "id_rol" });
Auth.belongsTo(Persona, { foreignKey: "id_persona" });
Persona.hasMany(Resultado, { foreignKey: "id_persona" });
Persona.hasOne(Auth, { foreignKey: "id_persona" });
module.exports = {
  Auth,
  Persona,
  Rol,
  Resultado,
};
