const CalendarModel = require("./calendar.model.js");
const UsersModel = require("../Users/user.model.js");
const bcrypt = require("bcrypt");
const { MODULES, ac } = require("../../utils/accessControl");
const calendarModel = require("./calendar.model.js");

const getActivities = async (req, res, next) => {
  let clientId = req.params.id;
  const prospectId = req.query.prospect;

  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_activities);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    if (role === "Client") {
      clientId = req.userId;
    }

    let query = {
      $or: [],
    };

    if (clientId !== "undefined") {
      query.$or.push({ client: clientId, status: "active" });
      query.$or.push({ "prospect.client": clientId, status: "active" });
    }
    if (prospectId !== "undefined") {
      query.$or = [];
      query.$or.push({ prospect: prospectId, status: "active" });
    }

    if (prospectId === "undefined" && clientId === "undefined") {
      query = {
        status: { $eq: "active" },
      };
    }

    activities = await CalendarModel.find(query);

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
  const { date, prospect } = req.query;
  let client = req.query.client;

  try {
    const { role } = req;
    let permission = ac.can(role).readAny(MODULES.get_activities_by_day);

    if (!permission.granted) {
      return next({ name: "Permission" });
    }

    if (role === "Client") {
      client = req.userId;
    }
    let dateToFormat = date !== "undefined" ? new Date(date) : new Date();
    let formattedDate = dateToFormat.toISOString().slice(0, 10);
    console.log(formattedDate, "formattedDate");

    var regex = new RegExp(formattedDate);

    let query = {
      $or: [],
    };

    if (client !== "undefined") {
      console.log("ENTRO ACCAAAAAS CLIENTTT");
      query.$or.push({
        client: client,
        status: "active",
        start: { $regex: regex, $options: "i" },
      });
      query.$or.push({
        "prospect.client": client,
        status: "active",
        start: { $regex: regex, $options: "i" },
      });
    }

    if (prospect !== "undefined") {
      console.log("ENTRO ACCAAAAAS PROSPECTTT");
      query.$or = [];
      query.$or.push({
        prospect: prospect,
        start: { $regex: regex, $options: "i" },
        status: "active",
      });
    }

    if (prospect === "undefined" && client === "undefined") {
      console.log("ENTRO ACCAAAAAS");
      query = {
        start: { $regex: regex, $options: "i" },
        status: "active",
      };
    }
    const activity = await CalendarModel.find(query)
      .sort({ start: 1 })
      .populate({
        path: "client",
        path: "prospect",
        populate: {
          path: "client",
        },
      })
      .populate("client");

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

    await CalendarModel.findByIdAndUpdate(
      id,
      { status: "disabled" },
      { new: true }
    );

    console.log("archivado");

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
