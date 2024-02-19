const clientModel = require("./client.model.js");
const clientsModel = require("./client.model.js");
const bcrypt = require("bcrypt");

const getClients = async (req, res) => {
  try {
    const clients = await clientsModel.find({
      status: { $eq: "active" },
    });

    if (clients) {
      return res.status(200).json(clients);
    } else {
      return res.status(400).json({ error: "empty" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientsModel.findById(id);

    if (client) {
      return res.status(200).json(client);
    } else {
      return res.status(400).json(["The client does not exist"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerClient = async (req, res) => {
  const {
    name,
    lastName,
    email,
    cellphone,
    password,
    bussinesName,
    totalPayment,
    dues,
    comments,
    closer,
    setter,
    growthPartner,
  } = req.body;
  try {
    const clientEmailRegistered = await clientsModel.findOne({
      email: req.body.email,
    });
    const passwordHash = await bcrypt.hash(password, 10);

    if (!clientEmailRegistered) {
      const client = await clientsModel.create({
        name,
        lastName,
        email,
        cellphone,
        password: passwordHash,
        bussinesName,
        totalPayment,
        dues,
        comments,
        closer: closer === "checked" ? true : false,
        setter: setter === "checked" ? true : false,
        growthPartner: growthPartner === "checked" ? true : false,
      });
      return res.status(200).json([client, "Registered client successfully"]);
    } else {
      return res.status(400).json("Client already registered.");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await clientsModel.findOne({
      email,
    });

    if (client) {
      await bcrypt.compare(password, client.password, function (err, result) {
        if (err) {
          console.error(err);
          return;
        }
        if (result) {
          return res.status(200).json(client);
        } else {
          return res
            .status(400)
            .json({ error: "Las contraseñas no coinciden" });
        }
      });
    } else {
      return res.status(400).json({ error: "Unregistered client" });
    }
  } catch (error) {
    console.log(error);
  }
};

const editClient = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    email,
    cellphone,
    password,
    bussinesName,
    totalPayment,
    dues,
    comments,
    closer,
    setter,
    growthPartner,
  } = req.body;

  try {
    const ClientCheckCellphone = await clientsModel.findOne({ cellphone });
    const clientCheckEmail = await clientsModel.findOne({ email });

    const client = await clientsModel.findById(id);

    if (cellphone !== client.cellphone) {
      if (ClientCheckCellphone) {
        return res
          .status(400)
          .send([
            ["This cellphone is already registered."],
            { cellphone: true },
          ]);
      }
    }

    if (email !== client.email) {
      if (clientCheckEmail) {
        return res
          .status(400)
          .send([["This email is already registered."], { email: true }]);
      }
    }

    if (password === "") {
      const clientUpdated = await clientModel.findByIdAndUpdate(
        id,
        {
          cellphone,
          lastName,
          email,
          name,
          bussinesName,
          totalPayment,
          dues,
          comments,
          closer: closer === "checked" ? true : false,
          setter: setter === "checked" ? true : false,
          growthPartner: growthPartner === "checked" ? true : false,
        },
        {
          new: true,
        }
      );

      return res.status(200).json([clientUpdated, "Client updated."]);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const clientUpdated = await clientModel.findByIdAndUpdate(
        id,
        {
          cellphone,
          email,
          name,
          lastName,
          password: passwordHash,
          bussinesName,
          totalPayment,
          dues,
          comments,
          closer: closer === "checked" ? true : false,
          setter: setter === "checked" ? true : false,
          growthPartner: growthPartner === "checked" ? true : false,
        },
        {
          new: true,
        }
      );

      return res.status(200).json([clientUpdated, "Client updated"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const disableClient = async (req, res) => {
  const { id } = req.params;
  try {
    await clientsModel.findByIdAndUpdate(
      id,
      { status: "disabled" },
      { new: true }
    );

    return res.status(200).json(["Client Disabled."]);
  } catch (error) {
    return res.status(400).json({ error: "Error when disabling client" });
  }
};
module.exports = {
  registerClient,
  loginClient,
  editClient,
  disableClient,
  getClients,
  getClientById,
};
