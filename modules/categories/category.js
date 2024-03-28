const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId= Schema.ObjectId;

const categoryschema = new Schema({
  name: { type: String, require: true },
  parentId: { type: ObjectId, ref: "category" }, 
});
module.exports = mongoose.model("category", categoryschema);
