const express = require("express");
const path = require("path");
const { db } = require("./db/connection.js");

require("dotenv").config();
const cors = require("cors");

const app = express();

const port = process.env.PORT;

//bd
try {
  db.authenticate();
  console.log("Base de Datos online");
} catch (er) {
  console.log(er);
  throw new Error();
}

app.use(cors());

//parseo de la informacion
app.use(express.json());

//directorio publico

app.use(express.static("public"));

//routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/persona", require("./routes/persona"));
app.use("/api/resultado", require("./routes/resultado"));

//directorio necesario para rutas
app.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto.. ${port}`);
});
