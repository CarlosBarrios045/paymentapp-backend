const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  role: {
    type: String,
    required: true,
  },
});

module.exports = model("Users", usersSchema);
