const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClientsSchema = Schema(
  {
    bussinesName: {
      type: String,
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    cellphone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      enum: ["disabled", "active"],

      type: String,
      default: "active",
    },

    dues: {
      type: String,
    },

    totalPayment: {
      type: String,
    },
    comments: {
      type: String,
    },

    closer: {
      type: Boolean,
      default: false,
    },
    setter: {
      type: Boolean,
      default: false,
    },
    growthPartner: {
      type: Boolean,
      default: false,
    },
    prospects: {
      type: Schema.Types.ObjectId,
      ref: "Prospects",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clients", ClientsSchema);
