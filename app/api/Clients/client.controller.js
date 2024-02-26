const clientsModel = require("./client.model.js");
const UsersModel = require("../Users/user.model.js");
const bcrypt = require("bcrypt");
const { MODULES, ac } = require("../../utils/accessControl");

const getClients = async (req, res, next) => {
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_clients);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

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

const getClientsPaginate = async (req, res, next) => {
  try {
    const { role } = req;
    const { page, id, search } = req.query;
    let permission = ac.can(role).readAny(MODULES.get_clients_paginate);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const options = {
      page: page,
      limit: 7,
      sort: { createdAt: "desc" },
    };

    //////////////////////////
    if (search !== "undefined") {
      var regex = new RegExp(search);

      const clientSearchName = await clientsModel.paginate(
        {
          name: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (clientSearchName.docs.length) {
        return res.status(200).json(clientSearchName);
      }
      /////////////////////
      const clientSearchLastName = await clientsModel.paginate(
        {
          lastName: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (clientSearchLastName.docs.length) {
        return res.status(200).json(clientSearchLastName);
      }
      /////////////////////

      const clientSearchEmail = await clientsModel.paginate(
        {
          email: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (clientSearchEmail.docs.length) {
        return res.status(200).json(clientSearchEmail);
      }

      ///////////////////
      const clientSearchBussinesName = await clientsModel.paginate(
        {
          bussinesName: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (clientSearchBussinesName.docs.length) {
        return res.status(200).json(clientSearchBussinesName);
      }

      ///////////////////

      const clientSearchNumber = await clientsModel.paginate(
        {
          cellphone: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (clientSearchNumber.docs.length) {
        return res.status(200).json(clientSearchNumber);
      }

      ///////////////////////

      return res.status(200).json({
        docs: [],
        totalDocs: 0,
        limit: 9,
        totalPages: 1,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
      });
    } else {
      const clients = await clientsModel.paginate(
        {
          status: { $eq: "active" },
        },
        options
      );

      return res.status(200).json(clients);
    }
  } catch (error) {
    console.log(error);
  }
};

const getClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_client_by_id);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }
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

const registerClient = async (req, res, next) => {
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
    const { role } = req;
    let permission = ac.can(role).createAny(MODULES.register_client);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const clientEmailRegistered = await clientsModel.findOne({
      email: req.body.email,
    });

    const clientCellphoneRegistered = await clientsModel.findOne({
      cellphone: req.body.cellphone,
    });
    const passwordHash = await bcrypt.hash(password, 10);

    if (!clientEmailRegistered && !clientCellphoneRegistered) {
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
      const userClientRol = await UsersModel.create({
        _id: client._id,
        name,
        lastName,
        email,
        cellphone,
        password: passwordHash,
        bussinesName,
        role: "Client",
      });
      return res.status(200).json([client, "Registered client successfully"]);
    } else {
      if (clientCellphoneRegistered) {
        return res
          .status(400)
          .send([
            ["This cellphone is already registered."],
            { cellphone: true },
          ]);
      }

      if (clientEmailRegistered) {
        return res
          .status(400)
          .send([["This email is already registered."], { email: true }]);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const loginClient = async (req, res, next) => {
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

const editClient = async (req, res, next) => {
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
    const { role } = req;
    let permission = ac.can(role).updateAny(MODULES.edit_client);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

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
      const clientUpdated = await clientsModel.findByIdAndUpdate(
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

      const userClientRol = await UsersModel.findByIdAndUpdate(id, {
        name,
        lastName,
        email,
        cellphone,
      });

      return res.status(200).json([clientUpdated, "Client updated."]);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const clientUpdated = await clientsModel.findByIdAndUpdate(
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

      const userClientRol = await UsersModel.findByIdAndUpdate(id, {
        name,
        lastName,
        password: passwordHash,
        email,
        cellphone,
      });

      return res.status(200).json([clientUpdated, "Client updated"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const disableClient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).deleteAny(MODULES.disable_client);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

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
  getClientsPaginate,
};
