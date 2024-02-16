const express = require("express");
const {
  registerClient,
  loginClient,
  editClient,
  disableClient,
  getClients,
  getClientById,
} = require("./client.controller");

const router = express.Router();

router.post("/register-client", registerClient);
router.post("/login-client", loginClient);
router.put("/edit-client/:id", editClient);
router.post("/disable-client/:id", disableClient);
router.get("/", getClients);
router.get("/:id", getClientById);

module.exports = router;
