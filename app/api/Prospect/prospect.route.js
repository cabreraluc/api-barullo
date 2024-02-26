const express = require("express");
const {
  registerProspect,

  editProspect,
  disableProspect,
  getProspects,
  getProspectById,
  getProspectsPaginate,
} = require("./prospect.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register-prospect", auth, registerProspect);

router.put("/edit-prospect/:id", auth, editProspect);
router.delete("/disable-prospect/:id", auth, disableProspect);
router.get("/", auth, getProspects);
router.get("/paginate/", auth, getProspectsPaginate);
router.get("/:id", auth, getProspectById);

module.exports = router;
