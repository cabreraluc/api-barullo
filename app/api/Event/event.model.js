const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ciclo = Schema({
  name: {
    String,
  },
  logo: {
    String,
  },
});

const artistGenAndTime = Schema({
  time: {
    String,
  },
  genre: [String],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artists",
  },
});

const simplePromo = Schema({
  ticketsToBuy: {
    type: Number,
  },

  ticketsReceived: {
    type: Number,
  },

  price: {
    type: Number,
  },
});

const EventsSchema = Schema(
  {
    eventDate: {
      type: String,
    },
    eventHour: {
      type: String,
    },
    locationGoogleMaps: {
      type: String,
    },
    paymentMethod: {
      enum: ["transfer", "mercado_pago"],
      type: String,
    },
    showLocation: {
      type: Boolean,
    },
    driveLists: {
      publicList: {
        type: String,
      },
      privateList: {
        type: String,
      },
    },
    name: {
      type: String,
    },
    status: {
      enum: ["disabled", "active", "archived"],

      type: String,
      default: "active",
    },
    artistsGenAndTime: [artistGenAndTime],

    colaborations: [ciclo],

    priceAndPromos: {
      promo: {
        enum: [
          "free",
          "free_until",
          "porcentaje",
          "user_registered",
          "past_event",
          "simple",
          "advance_tickets",
          null,
        ],
        default: null,
      },
      freeUntilHour: { type: String },
      porcentaje: { type: String },
      simplePromos: [simplePromo],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Events", EventsSchema);
