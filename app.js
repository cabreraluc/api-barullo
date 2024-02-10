const express = require("express");
const api = require("./app/api/index");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", api);

module.exports = app;
