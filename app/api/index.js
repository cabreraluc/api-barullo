const router = require("express").Router();
const users = require("./Users/user.route");
const clients = require("./Clients/client.route");
const products = require("./Product/product.route");
const prospects = require("./Prospect/prospect.route");
const secondClients = require("./SecondClient/secondClient.route");
const calendar = require("./Calendar/calendar.route");
const artists = require("./Artists/artist.route");

router.use("/users", users);
router.use("/artists", artists);
router.use("/clients", clients);
router.use("/products", products);
router.use("/prospects", prospects);
router.use("/calendar", calendar);
router.use("/secondClients", secondClients);

module.exports = router;
