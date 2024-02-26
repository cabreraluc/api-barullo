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

const getProspectsPaginate = async (req, res, next) => {
  try {
    const { role } = req;
    const { page, id, search } = req.query;
    let permission = ac.can(role).readAny(MODULES.get_prospects_paginate);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const options = {
      page: page,
      limit: 7,
      sort: { createdAt: "desc" },
    };

    let query = role !== "Admin" && role !== "Client" ? { user: id } : {};
    console.log(id);

    if (role === "Client") {
      query.client = id;
    }

    console.log(query);

    //////////////////////////
    if (search !== "undefined") {
      var regex = new RegExp(search);

      const prospectSearchName = await prospectsModel.paginate(
        {
          ...query,
          name: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (prospectSearchName.docs.length) {
        return res.status(200).json(prospectSearchName);
      }
      /////////////////////
      const prospectSearchLastname = await prospectsModel.paginate(
        {
          ...query,
          lastName: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (prospectSearchLastname.docs.length) {
        return res.status(200).json(prospectSearchLastname);
      }
      /////////////////////

      const prospectSearchEmail = await prospectsModel.paginate(
        {
          ...query,
          email: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (prospectSearchEmail.docs.length) {
        return res.status(200).json(prospectSearchEmail);
      }

      ///////////////////

      const prospectSearchNumber = await prospectsModel.paginate(
        {
          ...query,
          cellphone: { $regex: regex, $options: "i" },
          status: { $eq: "active" },
        },
        options
      );

      if (prospectSearchNumber.docs.length) {
        return res.status(200).json(prospectSearchNumber);
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
      const propects = await prospectsModel.paginate(
        {
          ...query,
          status: { $eq: "active" },
        },
        options
      );

      console.log(propects);

      return res.status(200).json(propects);
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

const changeProspectStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.query;

  try {
    const { role } = req;
    let permission = ac.can(role).updateAny(MODULES.change_prospect_status);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    let prospect = await prospectsModel.findByIdAndUpdate(id, {
      statusOfProspect: status,
    });

    return res.status(200).json(["Updated prospect status."]);
  } catch (error) {
    console.log(error);
  }
};

const changeInterestLevel = async (req, res, next) => {
  const { id } = req.params;
  const { interest } = req.query;

  try {
    const { role } = req;
    let permission = ac.can(role).updateAny(MODULES.change_interest_level);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    let prospect = await prospectsModel.findByIdAndUpdate(id, {
      interestLevel: interest,
    });

    return res.status(200).json(["Prospect interest level updated."]);
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
  getProspectsPaginate,
  editProspect,
  disableProspect,
  getProspects,
  getProspectById,
  changeProspectStatus,
  changeInterestLevel,
};
