const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = Schema(
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
    role: {
      enum: ["Admin", "Setter", "Closer", "Client"],
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UsersSchema);
