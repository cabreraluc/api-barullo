const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersSchema = Schema(
  {
    companyName: String,
    email: String,
    password: String,
    nameOfPerson: String,
    lastNameOfPersona: String,
    typeOfCompany: String,
    status: ["disabled", "active"],
    rol: ["closer", "setter", "admin", "client"],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", UsersSchema);
