var express = require("express");
var router = express.Router();
const bill = require("./bill");
const Product = require("../product/product");

const getAll = async () => {
  try {
    const categories = await bill.find();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const add = async (data) => {
  try {
    const newbill = new bill({
      userId: data.userId,
      products: [{ productsId: data.productsId }],
      status: data.status,
    });
    await newbill.save();
    return newbill;
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

module.exports = { getAll, add, del};
