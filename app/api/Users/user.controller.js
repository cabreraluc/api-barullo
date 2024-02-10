const usersModel = require("./user.model.js");

const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find();

    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ error: "empty" });
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const userEmailRegistered = await usersModel.findOne({
      email: req.body.email,
    });

    console.log(userEmailRegistered);

    if (!userEmailRegistered) {
      const user = await usersModel.create(req.body);
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "User already registered" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await usersModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "Unregistered user" });
    }
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    const user = await usersModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "Usuario no registrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

const disableUser = async (req, res) => {
  try {
    const user = await usersModel.findOneAndUpdate(
      { email: req.body.email },
      { status: "disabled" },
      { new: true }
    );
    console.log(user);

    if (user) {
      return res.status(200).json({ response: "User disabled" });
    } else {
      return res.status(400).json({ error: "Error when disabling user" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  editUser,
  disableUser,
  getUsers,
};
