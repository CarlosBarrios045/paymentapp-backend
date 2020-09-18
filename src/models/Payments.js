import { Schema, model, ObjectId } from "mongoose";

const paymentsSchema = new Schema({
  date: Date,
  amount: String,
  user: ObjectId,
});

export default model("Payments", paymentsSchema);
