const productModel = require("./product.model");
const productsJson = require("../../../products.json");

const addAllProducts = async (req, res) => {
  try {
    productsJson.forEach(async (e) => {
      const newProduct = new productModel({
        title: e.title,
        price: e.price,
        description: e.description,
        image: e.image,
        category: e.category,
      });
      const savedProduct = await newProduct.save();
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductsPraginate = async (req, res) => {
  const { page } = req.query;
  try {
    const options = {
      page: page,
      limit: 8,
    };
    const allProducts = await productModel.paginate({}, options);

    if (allProducts.docs.length) {
      return res.status(201).json(allProducts);
    } else {
      await addAllProducts();
      const allProducts = await productModel.paginate({}, options);
      return res.status(201).json(allProducts);
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    let allProducts = await productModel.find();

    while (!allProducts.length) {
      allProducts = await productModel.find();
      console.log("AAA");
    }

    return res.status(201).json(allProducts);
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  try {
    await productModel.create(req.body);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addAllProducts,
  getProductsPraginate,
  getAllProducts,
  addProduct,
};
