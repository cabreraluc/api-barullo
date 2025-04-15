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
    primaryImage: {
      type: String,
    },
    secondaryImage: {
      type: String,
    },
    eventDate: {
      type: String,
    },
    status: {
      enum: ["disabled", "active", "archived"],

      type: String,
      default: "active",
    },
    organization: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artists", ArtistsSchema);
