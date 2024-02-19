const express = require("express");
const {
  registerProspect,
  loginProspect,
  editProspect,
  disableProspect,
  getProspects,
  getProspectById,
} = require("./prospect.controller");

const router = express.Router();

router.post("/register-prospect", registerProspect);
router.post("/login-prospect", loginProspect);
router.put("/edit-prospect/:id", editProspect);
router.post("/disable-prospect/:id", disableProspect);
router.get("/", getProspects);
router.get("/:id", getProspectById);

module.exports = router;
