const path = require("path");
const multer = require("multer");
const Persona = require("../models/persona");
const Resultado = require("../models/resultado");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/Pdf");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("pdf");

const uploadFile = async (req, res) => {
  const { cedula } = req.body;

  try {
    const { id } = await Persona.findOne({
      where: {
        cedula: cedula,
      },
    });

    const analisis = Resultado.build({
      file: req.file.filename,
      id_persona: id,
    });

    await analisis.save();

    res.status(200).json({
      ok: true,
      msg: "El resultado del análisis fue asignado correctamente",
      analisis,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error en el server",
    });
  }
};

const obtenerResultados = async (req, res) => {
  const { id } = req.usuario;

  try {
    const results = await Resultado.findAll({
      where: {
        id_persona: id,
      },
    });
    if (results.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: "El Cliente no esta registrado...",
      });
    }
    res.status(200).json({
      ok: true,
      results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error en el server",
    });
  }
};

module.exports = {
  upload,
  uploadFile,
  obtenerResultados,
};
