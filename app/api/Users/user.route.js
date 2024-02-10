const express = require("express");
const {
  registerUser,
  loginUser,
  editUser,
  disableUser,
  getUsers,
} = require("./user.controller");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.put("/edit-user", editUser);
router.post("/disable-user", disableUser);
router.get("/", getUsers);

module.exports = router;
