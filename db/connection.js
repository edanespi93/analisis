const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "bau9gqqoyojaqh7neyte",
  "usvo8nolohzjweem",
  "wGxtgkXhUTcaB0a6fqjn",
  {
    host: "bau9gqqoyojaqh7neyte-mysql.services.clever-cloud.com",
    dialect: "mysql",
    logging: false,
    operatorsAliases: 0,
    //quoteIdentifiers: false,
  }
);

module.exports = { db };
