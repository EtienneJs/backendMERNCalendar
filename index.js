const express = require("express");
const { dbConnection } = require("./db/config");
const cors = require("cors");
require("dotenv").config();

//Crear el servidor de express

const app = express();

//dbConnection

dbConnection();

//cors
app.use(cors());

//Directorio publico
app.use(express.static("public"));
//Rutas

//lectura y parseo
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/events"));
//TODO CRUDS:Eventos

//Escuchar

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
