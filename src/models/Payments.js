const { Schema, model, ObjectId } = require("mongoose");

const paymentsSchema = new Schema({
  date: Date,
  amount: String,
  user: ObjectId,
});

module.exports = model("Payments", paymentsSchema);
