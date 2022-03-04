const DataTypes = require("sequelize");

const { db } = require("../db/connection");

const Resultado = db.define("resultado", {
  file: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_persona: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

module.exports = Resultado;
