const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = Schema(
  {
    email: {
      type: String,
    },
    description: {
      type: String,
    },
    name: {
      type: String,
    },
    scanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
