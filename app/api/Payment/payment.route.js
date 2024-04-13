const express = require("express");
const { createPreference } = require("./payment.controller");

const router = express.Router();

router.post("/create-preference", createPreference);

module.exports = router;
