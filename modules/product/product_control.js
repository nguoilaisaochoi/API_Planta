var express = require("express");
var router = express.Router();

const upload = require("../../config/upload");
const Product = require("./product");
const Categories = require("../categories/category");
const list = async () => {
  try {
    const product = await Product.find({});
    return product;
  } catch (error) {
    console.log(error);
  }
};
const listid = async (_id) => {
  try {
    const product = await Product.find({ _id });
    console.log(product);
    return product;
  } catch (error) {
    console.log(error);
  }
};
const add = async (data) => {
  try {
    const newproduct = new Product({
      name: data.name,
      category: data.category,
      price: data.price,
      size: data.size,
      origin: data.origin,
      quantity: data.quantity,
      image: data.image,
    });
    let result = await newproduct.save();
    return result;
  } catch (err) {
    console.log(err);
  }
};
const update = async (data) => {
  const update_product = await Product.findById((_id = data.id));
  console.log(data);
  let result = null;
  try {
    if (update_product) {
      update_product.name = data.name ?? update_product.name;
      update_product.category = data.category ?? update_product.category;
      update_product.price = data.price ?? update_product.price;
      update_product.size = data.size ?? update_product.size;
      update_product.origin = data.origin ?? update_product.origin;
      update_product.quantity = data.quantity ?? update_product.quantity;
      update_product.image = data.image ?? update_product.image;
      result = await update_product.save();
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
const del = async (id) => {
  let result;
  try {
    result = await Product.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
  return result;
};
module.exports = { list, add, update, del, listid };
