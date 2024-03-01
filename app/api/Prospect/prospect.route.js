const express = require("express");
const {
  registerProspect,
  changeProspectStatus,
  editProspect,
  disableProspect,
  getProspects,
  getProspectById,
  getProspectsPaginate,
  changeInterestLevel,
} = require("./prospect.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register-prospect", auth, registerProspect);
router.put("/prospect-status/:id", auth, changeProspectStatus);
router.put("/interest-level/:id", auth, changeInterestLevel);
router.put("/edit-prospect/:id", auth, editProspect);
router.delete("/disable-prospect/:id", auth, disableProspect);
router.get("/", auth, getProspects);
router.get("/paginate/", auth, getProspectsPaginate);
router.get("/:id", auth, getProspectById);

module.exports = router;
