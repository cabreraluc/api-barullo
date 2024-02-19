const prospectsModel = require("./prospect.model.js");
const bcrypt = require("bcrypt");
const userModel = require("../Users/user.model.js");
const clientModel = require("../Clients/client.model.js");

const getProspects = async (req, res) => {
  try {
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

const getProspectById = async (req, res) => {
  const { id } = req.params;
  try {
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

const registerProspect = async (req, res) => {
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
    if (email !== "") {
      const prospectEmailRegistered = await prospectsModel.findOne({
        email: req.body.email,
      });

      if (!prospectEmailRegistered) {
        const prospect = await prospectsModel.create({
          name,
          lastName,
          age,
          cellphone,
          email,
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

        return res
          .status(200)
          .json([prospect, "Registered prospect successfully"]);
      } else {
        return res.status(400).json("Prospect already registered.");
      }
    } else {
      const prospect = await prospectsModel.create({
        name,
        lastName,
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

      return res
        .status(200)
        .json([prospect, "Registered prospect successfully"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const loginProspect = async (req, res) => {
  const { email, password } = req.body;
  try {
    const prospect = await prospectsModel.findOne({
      email,
    });

    if (prospect) {
      await bcrypt.compare(password, prospect.password, function (err, result) {
        if (err) {
          console.error(err);
          return;
        }
        if (result) {
          return res.status(200).json(prospect);
        } else {
          return res
            .status(400)
            .json({ error: "Las contraseñas no coinciden" });
        }
      });
    } else {
      return res.status(400).json({ error: "Unregistered prospect" });
    }
  } catch (error) {
    console.log(error);
  }
};

const editProspect = async (req, res) => {
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
    const ProspectCheckCellphone = await prospectsModel.findOne({ cellphone });
    const prospectCheckEmail = await prospectsModel.findOne({ email });

    const prospect = await prospectsModel.findById(id);

    if (cellphone !== prospect.cellphone) {
      if (ProspectCheckCellphone) {
        return res
          .status(400)
          .send([
            ["This cellphone is already registered."],
            { cellphone: true },
          ]);
      }
    }

    if (email !== prospect.email) {
      if (prospectCheckEmail) {
        return res
          .status(400)
          .send([["This email is already registered."], { email: true }]);
      }
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

const disableProspect = async (req, res) => {
  const { id } = req.params;
  try {
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
  loginProspect,
  editProspect,
  disableProspect,
  getProspects,
  getProspectById,
};
