const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArtistsSchema = Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    cellphone: {
      type: String,
    },
    artistName: {
      type: String,
    },
    secondaryArtistName: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    soundCloud: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    spotify: {
      type: String,
    },
    soundCloudSecondary: {
      type: String,
    },
    instagramSecondary: {
      type: String,
    },
    youtubeSecondary: {
      type: String,
    },
    spotifySecondary: {
      type: String,
    },
    primaryImage: {
      type: String,
    },
    secondaryImage: {
      type: String,
    },
    status: {
      enum: ["disabled", "active"],

      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artists", ArtistsSchema);
