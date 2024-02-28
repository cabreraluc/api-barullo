const express = require("express");
const {
  registerActivity,
  editActivity,
  archiveActivity,
  getActivities,
  getActivityById,
} = require("./calendar.controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post("/register-activity", auth, registerActivity);
router.put("/edit-activity/:id", auth, editActivity);
router.delete("/archive-activity/:id", auth, archiveActivity);
router.get("/", auth, getActivities);
router.get("/:id", auth, getActivityById);

module.exports = router;
