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
    clientRole: {
      enum: ["Admin", "Setter", "Closer"],
      type: String,
      default: "active",
    },

    dues: {
      type: String,
    },

    totalPayment: {
      type: String,
    },

    closer: {
      type: Boolean,
    },
    setter: {
      type: Boolean,
    },
    growthPartner: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clients", ClientsSchema);
