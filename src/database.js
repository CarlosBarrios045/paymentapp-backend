const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "variables.env" });

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));
