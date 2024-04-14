const express = require("express");
const { createPreference, sendInfo } = require("./payment.controller");

const router = express.Router();

router.post("/create-preference", createPreference);
router.post("/send-info", sendInfo);

module.exports = router;
