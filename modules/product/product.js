const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productschema = new Schema(
  {
    name: { type: String, require: true },
    category: { type: Object, require: true },
    price: { type: Number, require: true },
    size: { type: String, require: true },
    origin: { type: String, require: true },
    quantity: { type: String, require: true },
    image: { type: Array },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productschema);
