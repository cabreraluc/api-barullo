const router = require("express").Router();
const users = require("./Users/user.route");
const artists = require("./Artists/artist.route");
const payment = require("./Payment/payment.route");

router.use("/users", users);
router.use("/artists", artists);
router.use("/payment", payment);

module.exports = router;
