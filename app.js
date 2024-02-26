const express = require("express");
const api = require("./app/api/index");
const errorHandler = require("./app/middlewares/errorHandler");
const app = express();
const morgan = require("morgan");

// Usar 'morgan' middleware para registrar las peticiones
app.use(morgan("dev"));

app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", api);
app.use(errorHandler);

module.exports = app;
