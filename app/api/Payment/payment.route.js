const express = require("express");
const {
  createPreference,
  sendInfo,
  getPaymentByQr,
} = require("./payment.controller");

const router = express.Router();

router.post("/create-preference", createPreference);
router.post("/send-info", sendInfo);
router.get("/get-payment-by-qr/:id", getPaymentByQr);

module.exports = router;
