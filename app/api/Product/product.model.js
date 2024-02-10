const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const ProductSchema = Schema(
  {
    title: String,
    price: String,
    description: String,
    image: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Products", ProductSchema);
