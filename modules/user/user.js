const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userschema);
