const cartModel = require("../models/Cart");
const ObjectId = require("mongoose");

// getFavourites,
// deleteProductFromFavourites,

const addProductToCart = async (req, res) => {
  const { product, user } = req.body;
  try {
    await cartModel.create({
      product: product,
      users: user,
    });

    console.log(product, user);
  } catch (error) {
    console.log(error);
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    let cart = await cartModel
      .find({ users: { _id: id } })
      .populate("product")
      .populate("users");
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProductToCart, getCart };
