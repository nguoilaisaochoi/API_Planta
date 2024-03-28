const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const billschema = new Schema({
  orderdate: { type: Date, default: Date.now() },
  userId: { type: ObjectId, ref: "user" },
  products: [
    {
      productsId: { type: ObjectId, ref: "product" },
    },
  ],
  status: String,
});
module.exports = mongoose.model("bill", billschema);
