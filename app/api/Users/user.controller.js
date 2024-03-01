const userModel = require("./user.model.js");
const usersModel = require("./user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MODULES, ac } = require("../../utils/accessControl.js");

const getUsers = async (req, res, next) => {
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_users);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const users = await usersModel.find({
      status: "active",
      role: { $ne: "Client" },
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

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_user_by_id);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }
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

const registerUser = async (req, res, next) => {
  const { name, lastName, email, cellphone, password, role } = req.body;
  try {
    let permission = ac.can(req.role).createAny(MODULES.register_user);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const userEmailRegistered = await usersModel.findOne({
      email: req.body.email,
    });

    const userCellphoneRegistered = await usersModel.findOne({
      cellphone: req.body.cellphone,
    });
    const passwordHash = await bcrypt.hash(password, 10);

    if (!userEmailRegistered && !userCellphoneRegistered) {
      const user = await usersModel.create({
        name,
        lastName,
        email,
        cellphone,
        password: passwordHash,
        role,
      });
      return res.status(200).json([user, "Registered user successfully"]);
    } else {
      if (userCellphoneRegistered) {
        return res
          .status(400)
          .send([
            ["This cellphone is already registered."],
            { cellphone: true },
          ]);
      }

      if (userEmailRegistered) {
        return res
          .status(400)
          .send([["This email is already registered."], { email: true }]);
      }
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
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
          let userForJwt = {
            id: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
            lastName: user.lastName,
          };
          const jwtToken = jwt.sign(userForJwt, process.env.JWT_SECRET, {
            expiresIn: "12h",
          });
          return res.status(200).send({ ...userForJwt, token: jwtToken });
        } else {
          return res.status(400).json({ error: "Wrong email or password." });
        }
      });
    } else {
      return res.status(400).json({ error: "Unregistered user." });
    }
  } catch (error) {
    console.log(error);
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, lastName, email, cellphone, password, role } = req.body;

  try {
    let permission = ac.can(req.role).updateAny(MODULES.edit_user);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

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
        { cellphone, lastName, email, name, role },
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
          role,
        },
        {
          new: true,
        }
      );

      return res.status(200).json([userUpdated, "User updated"]);
    }
  } catch (error) {
    next(error);
  }
};

const disableUser = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { role } = req;
    let permission = ac.can(role).deleteAny(MODULES.disable_user);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    await usersModel.findByIdAndUpdate(
      id,
      { status: "disabled" },
      { new: true }
    );

    return res.status(200).json(["User Disabled."]);
  } catch (error) {
    next(error);
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
