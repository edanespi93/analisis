const DataTypes = require("sequelize");

const { db } = require("../db/connection");

const Persona = db.define("persona", {
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_rol: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    defaultValue: 2,
  },
});


module.exports = Persona;
