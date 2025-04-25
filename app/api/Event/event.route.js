const express = require("express");
const {
  registerArtist,
  editArtist,
  disableOrActiveArtist,
  getArtists,
  getArtistById,
} = require("./artist.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register-artist", auth, registerArtist);
router.put("/edit-artist/:id", auth, editArtist);
router.put("/disable-or-active-artist/:id", auth, disableOrActiveArtist);
router.get("/", getArtists);
router.get("/:id", auth, getArtistById);

module.exports = router;
