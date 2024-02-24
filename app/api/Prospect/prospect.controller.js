const prospectsModel = require("./prospect.model.js");
const bcrypt = require("bcrypt");
const userModel = require("../Users/user.model.js");
const clientModel = require("../Clients/client.model.js");
const { MODULES, ac } = require("../../utils/accessControl");

const getProspects = async (req, res, next) => {
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_prospects);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const prospects = await prospectsModel.find({
      status: { $eq: "active" },
    });

    if (prospects) {
      return res.status(200).json(prospects);
    } else {
      return res.status(400).json({ error: "empty" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProspectById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_prospect_by_id);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    let prospect = await prospectsModel.findById(id);

    if (prospect) {
      const userData = await userModel.findById(prospect.user._id);
      const clientData = await clientModel.findById(prospect.client._id);
      prospect.user = userData;
      prospect.client = clientData;

      console.log(prospect);
      return res.status(200).json(prospect);
    } else {
      return res.status(400).json(["The prospect does not exist"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerProspect = async (req, res, next) => {
  const {
    name,
    lastName,
    age,
    cellphone,
    email,
    statusOfProspect,
    country,
    gender,
    genderComments,
    interestLevel,
    reasonForContact,
    occupation,
    instagram,
    linkedin,
    facebook,
    tiktok,
    comments,
    client,
    user,
  } = req.body;
  try {
    const { role } = req;
    let permission = ac.can(role).createAny(MODULES.register_prospect);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const prospect = await prospectsModel.create({
      name,
      lastName,
      email,
      age,
      cellphone,
      statusOfProspect: "To call",
      country,
      gender,
      genderComments,
      interestLevel,
      reasonForContact,
      occupation,
      instagram,
      linkedin,
      facebook,
      tiktok,
      comments,
      client,
      user,
    });

    return res.status(200).json([prospect, "Registered prospect successfully"]);
  } catch (error) {
    console.log(error);
  }
};

const editProspect = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    lastName,
    age,
    cellphone,
    email,
    statusOfProspect,
    country,
    gender,
    genderComments,
    interestLevel,
    reasonForContact,
    occupation,
    instagram,
    linkedin,
    facebook,
    tiktok,
    comments,
    client,
    user,
  } = req.body;

  try {
    const { role } = req;
    let permission = ac.can(role).updateAny(MODULES.edit_prospect);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const prospectUpdated = await prospectsModel.findByIdAndUpdate(
      id,
      {
        name,
        lastName,
        age,
        cellphone,
        email,
        statusOfProspect,
        country,
        gender,
        genderComments,
        interestLevel,
        reasonForContact,
        occupation,
        instagram,
        linkedin,
        facebook,
        tiktok,
        comments,
        client,
        user,
      },
      {
        new: true,
      }
    );

    return res.status(200).json([prospectUpdated, "Prospect updated"]);
  } catch (error) {
    console.log(error);
  }
};

const disableProspect = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { role } = req;
    let permission = ac.can(role).deleteAny(MODULES.disable_prospect);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    await prospectsModel.findByIdAndUpdate(
      id,
      { status: "disabled" },
      { new: true }
    );

    return res.status(200).json(["Prospect Disabled."]);
  } catch (error) {
    return res.status(400).json({ error: "Error when disabling prospect" });
  }
};
module.exports = {
  registerProspect,

  editProspect,
  disableProspect,
  getProspects,
  getProspectById,
};
