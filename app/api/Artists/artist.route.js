const express = require("express");
const {
  registerArtist,
  loginArtist,
  editArtist,
  disableArtist,
  getArtists,
  getArtistById,
} = require("./artist.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register-artist", auth, registerArtist);
router.post("/login-artist", loginArtist);
router.put("/edit-artist/:id", auth, editArtist);
router.delete("/disable-artist/:id", auth, disableArtist);
router.get("/", getArtists);
router.get("/:id", auth, getArtistById);

module.exports = router;
