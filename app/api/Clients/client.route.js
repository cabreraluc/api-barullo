const express = require("express");
const {
  registerClient,
  loginClient,
  editClient,
  disableClient,
  getClients,
  getClientById,
} = require("./client.controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post("/register-client", auth, registerClient);
router.post("/login-client", loginClient);
router.put("/edit-client/:id", auth, editClient);
router.delete("/disable-client/:id", auth, disableClient);
router.get("/", auth, getClients);
router.get("/:id", auth, getClientById);

module.exports = router;
