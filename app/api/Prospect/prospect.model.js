const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProspectsSchema = Schema(
  {
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    age: {
      type: String,
    },
    cellphone: {
      type: String,
    },
    email: {
      type: String,
    },
    status: {
      enum: ["disabled", "active"],

      type: String,
      default: "active",
    },
    statusOfProspect: {
      enum: ["To call", "In process", "Closed"],

      type: String,
      default: "active",
    },

    country: {
      type: String,
    },

    gender: {
      type: String,
    },
    genderComments: {
      type: String,
    },

    occupation: {
      type: String,
    },

    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    facebook: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    comments: {
      type: String,
    },
    reasonForContact: {
      type: String,
    },
    interestLevel: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prospects", ProspectsSchema);
