const mongoose = require("mongoose");
const product = require("../product/product");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartschema = new Schema({
  orderdate: { type: Date, default: Date.now() },
  userId: { type: ObjectId, ref: "user" },
  products: [
    {
      productsId: { type: ObjectId, ref: "product", required: true },
      productname: { type: String, require: true },
      productimage: { type: Array },
      productcategory: { type: String, require: true },
      productprice: { type: Number, require: true },
      quantity: { type: Number, require: true },
    },
  ],
});
module.exports = mongoose.model("cart", cartschema);
