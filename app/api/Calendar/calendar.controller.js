const CalendarModel = require("./calendar.model.js");
const UsersModel = require("../Users/user.model.js");
const bcrypt = require("bcrypt");
const { MODULES, ac } = require("../../utils/accessControl");
const calendarModel = require("./calendar.model.js");

const getActivities = async (req, res, next) => {
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_activities);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    const activities = await CalendarModel.find({
      status: { $eq: "active" },
    });

    if (activities) {
      const activitiesResponse = activities.map((e) => {
        return { ...e._doc, id: e._id };
      });

      return res.status(200).json(activitiesResponse);
    } else {
      return res.status(400).json({ error: "empty" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getActivityById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_activity_by_id);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }
    const activity = await CalendarModel.findById(id).populate("prospect");

    console.log(activity);

    if (activity) {
      return res.status(200).json(activity);
    } else {
      return res.status(400).json(["The activity does not exist"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const getActivitiesByDay = async (req, res, next) => {
  const { date } = req.query;
  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_activities_by_day);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    console.log(date, "dateeeee");
    let dateToFormat = new Date(date);
    let formattedDate = dateToFormat.toISOString().slice(0, 10);

    console.log(formattedDate, "formaaaaaaaaaaated dateeeee");

    var regex = new RegExp(formattedDate);
    const activity = await CalendarModel.find({
      start: { $regex: regex, $options: "i" },
    })
      .sort({ start: 1 })
      .populate({
        path: "client",
        path: "prospect",
        populate: {
          path: "client",
        },
      })
      .populate("client");

    console.log(activity);

    if (activity) {
      return res.status(200).json(activity);
    } else {
      return res.status(400).json(["The activity does not exist"]);
    }
  } catch (error) {
    console.log(error);
  }
};

const registerActivity = async (req, res, next) => {
  const { title, prospect, start, end, allDay, details, client } = req.body;
  try {
    const { role } = req;
    let permission = ac.can(role).createAny(MODULES.register_activity);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    // const clientEmailRegistered = await CalendarModel.findOne({
    //   id: id,
    // });

    // const clientCellphoneRegistered = await clientsModel.findOne({
    //   cellphone: req.body.cellphone,
    // });
    // const passwordHash = await bcrypt.hash(password, 10);

    // if (!clientEmailRegistered && !clientCellphoneRegistered) {
    //   const client = await clientsModel.create({
    //     name,
    //     lastName,
    //     email,
    //     cellphone,
    //     password: passwordHash,
    //     bussinesName,
    //     totalPayment,
    //     dues,
    //     comments,
    //     closer: closer === "checked" ? true : false,
    //     setter: setter === "checked" ? true : false,
    //     growthPartner: growthPartner === "checked" ? true : false,
    //   });

    console.log(start, end);
    const Activity = await CalendarModel.create({
      title,
      start,
      end,
      allDay,
      prospect: prospect._id,
      details,
      client: client._id,
    });
    return res.status(200).json([Activity, "Registered activity successfully"]);
    // } else {
    //   if (clientCellphoneRegistered) {
    //     return res
    //       .status(400)
    //       .send([
    //         ["This cellphone is already registered."],
    //         { cellphone: true },
    //       ]);
    //   }

    //   if (clientEmailRegistered) {
    //     return res
    //       .status(400)
    //       .send([["This email is already registered."], { email: true }]);
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};

const editActivity = async (req, res, next) => {
  const { id } = req.params;
  const { title, details, prospect, context, start, end, allDay } = req.body;

  try {
    const { role } = req;
    let permission = ac.can(role).updateAny(MODULES.edit_activity);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }
    if (context === "editTime") {
      const startFormatted = start.slice(0, 19) + "-03:00";
      const endFormatted = end.slice(0, 19) + "-03:00";

      const activityEdited = await CalendarModel.findByIdAndUpdate(id, {
        start: startFormatted,
        end: endFormatted,
        allDay,
      });
      return res.status(200).json([activityEdited, "Updated event times."]);
    } else {
      const activityEdited = await CalendarModel.findByIdAndUpdate(id, {
        title,
        details,
        prospect,
      });

      return res.status(200).json([activityEdited, "Event updated."]);
    }
  } catch (error) {
    console.log(error);
  }
};

const archiveActivity = async (req, res, next) => {
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
  registerActivity,
  editActivity,
  archiveActivity,
  getActivities,
  getActivityById,
  getActivitiesByDay,
};
