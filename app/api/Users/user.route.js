const express = require("express");
const {
  registerUser,
  loginUser,
  editUser,
  disableUser,
  getUsers,
  getUserById,
} = require("./user.controller");

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.put("/edit-user/:id", editUser);
router.post("/disable-user/:id", disableUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

module.exports = router;
