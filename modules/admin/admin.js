const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminschema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
});
module.exports = mongoose.model("admin", adminschema);
