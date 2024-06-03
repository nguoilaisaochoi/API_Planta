const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const billschema = new Schema({
  orderdate: { type: Date, default: Date.now() },
  userId: { type: ObjectId, ref: "user" },
  products: [
    {
      productsId: { type: ObjectId, ref: "product", required: true },
      productname: { type: String, require: true },
      productimage: { type: Array },
      productcategory: { type: String, require: true },
      productprice: { type: String, require: true },
      quantity: { type: Number, require: true },
    },
  ],
  status: String,
});
module.exports = mongoose.model("bill", billschema);
