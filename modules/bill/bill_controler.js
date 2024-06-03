var express = require("express");
var router = express.Router();
const bill = require("./bill");
const Product = require("../product/product");
const Cart = require("../cart/cart");
const product = require("../product/product");

const getAll = async (iduser) => {
  try {
    const categories = await bill.findOne({ userId: iduser });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const add = async (iduser) => {
  try {
    const cart = await Cart.findOne({ userId: iduser });
    console.log(cart);
    if (cart) {
      const newbill = new bill({
        userId: cart.userId,
        products: cart.products.map(product => ({
          productsId: product.productsId,
          productname: product.productname,
          productimage: product.productimage,
          productcategory: product.productcategory,
          productprice: product.productprice,
          quantity: product.quantity,
        })),
        status: "Thanh toán thành công",
      });
      await newbill.save();
      await Cart.deleteOne({ _id: cart._id });
      return newbill;
    }
  } catch (error) {
    console.log(error);
  }
};

const del = async (id) => {
  try {
    let result = await bill.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, add, del };
