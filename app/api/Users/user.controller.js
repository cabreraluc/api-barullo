const userModel = require("./user.model.js");
const usersModel = require("./user.model.js");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const users = await usersModel.find({
      status: "active",
    });

    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ error: "empty" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await usersModel.findById(id);

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json(["The user does not exist"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { name, lastName, email, cellphone, password, userRole } = req.body;
  try {
    const userEmailRegistered = await usersModel.findOne({
      email: req.body.email,
    });
    const passwordHash = await bcrypt.hash(password, 10);

    if (!userEmailRegistered) {
      const user = await usersModel.create({
        name,
        lastName,
        email,
        cellphone,
        password: passwordHash,
        userRole,
      });
      return res.status(200).json([user, "Registered user successfully"]);
    } else {
      return res.status(400).json("User already registered.");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersModel.findOne({
      email,
    });

    if (user) {
      await bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          console.error(err);
          return;
        }
        if (result) {
          return res.status(200).json(user);
        } else {
          return res
            .status(400)
            .json({ error: "Las contraseñas no coinciden" });
        }
      });
    } else {
      return res.status(400).json({ error: "Unregistered user" });
    }
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, email, cellphone, password, userRole } = req.body;

  console.log(name, lastName, email, cellphone, password, userRole);
  try {
    const UserCheckCellphone = await usersModel.findOne({ cellphone });
    const userCheckEmail = await usersModel.findOne({ email });

    const user = await usersModel.findById(id);

    if (cellphone !== user.cellphone) {
      if (UserCheckCellphone) {
        return res
          .status(400)
          .send([
            ["This cellphone is already registered."],
            { cellphone: true },
          ]);
      }
    }

    if (email !== user.email) {
      if (userCheckEmail) {
        return res
          .status(400)
          .send([["This email is already registered."], { email: true }]);
      }
    }

    if (password === "") {
      const userUpdated = await userModel.findByIdAndUpdate(
        id,
        { cellphone, lastName, email, name, userRole },
        {
          new: true,
        }
      );

      return res.status(200).json([userUpdated, "User updated."]);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const userUpdated = await userModel.findByIdAndUpdate(
        id,
        {
          cellphone,
          email,
          name,
          lastName,
          password: passwordHash,
          userRole,
        },
        {
          new: true,
        }
      );

      return res.status(200).json([userUpdated, "User updated"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const disableUser = async (req, res) => {
  const { id } = req.params;
  try {
    await usersModel.findByIdAndUpdate(
      id,
      { status: "disabled" },
      { new: true }
    );

    return res.status(200).json(["User Disabled."]);
  } catch (error) {
    return res.status(400).json({ error: "Error when disabling user" });
  }
};
module.exports = {
  registerUser,
  loginUser,
  editUser,
  disableUser,
  getUsers,
  getUserById,
};
