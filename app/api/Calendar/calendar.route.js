const express = require("express");
const {
  registerActivity,
  editActivity,
  archiveActivity,
  getActivities,
  getActivityById,
  getActivitiesByDay,
} = require("./calendar.controller");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.post("/register-activity", auth, registerActivity);
router.put("/edit-activity/:id", auth, editActivity);
router.post("/archive-activity/:id", auth, archiveActivity);
router.get("/event-day", auth, getActivitiesByDay);
router.get("/get-all/:id", auth, getActivities);
router.get("/:id", auth, getActivityById);

module.exports = router;
