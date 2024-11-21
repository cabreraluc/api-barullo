require("dotenv").config();
const bodyParser = require("body-parser");
const app = require("./app");
const { appConfig, db } = require("./config");
const connectDb = require("./db/mongodb");
let cors = require("cors");
app.use(cors());

async function initApp(appConfig, dbConfig) {
  try {
    connectDb(dbConfig);
    app.listen(appConfig.port, "0.0.0.0", () =>
      console.log(`listen on ${appConfig.port}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

initApp(appConfig, db);
