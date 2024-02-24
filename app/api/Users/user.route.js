const express = require("express");
const {
  registerUser,
  loginUser,
  editUser,
  disableUser,
  getUsers,
  getUserById,
} = require("./user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register-user", auth, registerUser);
router.post("/login-user", loginUser);
router.put("/edit-user/:id", auth, editUser);
router.delete("/disable-user/:id", auth, disableUser);
router.get("/", auth, getUsers);
router.get("/:id", auth, getUserById);

module.exports = router;
