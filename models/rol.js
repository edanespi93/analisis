const DataTypes = require("sequelize");

const { db } = require("../db/connection");

const Rol = db.define("rol", {
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Rol;
