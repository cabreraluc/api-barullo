const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = Schema(
  {
    eventId: {
      type: String,
    },
    title: {
      type: String,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    details: {
      type: String,
    },
    allDay: {
      type: Boolean,
    },
    status: {
      enum: ["archive", "active", "finalized"],
      type: String,
      default: "active",
    },
    prospect: {
      type: Schema.Types.ObjectId,
      ref: "Prospects",
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users",
    // },
    // client: {
    //   type: Schema.Types.ObjectId,
    //   ref: "clients",
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Calendar", CalendarSchema);
