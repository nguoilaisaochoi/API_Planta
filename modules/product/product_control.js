var express = require("express");
var router = express.Router();

const upload = require("../../config/upload");
const Product = require("./product");
const Categories = require("../categories/category");

const list = async (_id) => {
  try {
    let products;
    if (_id) {
      products = await Product.findById(_id);
    } else {
      products = await Product.find({});
    }
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

async function findByName(name) {
  try {
    let products;
    if (name) {
      products = await Product.find({ name: { $regex: name, $options: "i" } });
    } else {
      products = null;
    }
    return products;
  } catch (error) {
    throw error;
  }
}

const add = async (name, price, size, category, image, origin, quantity) => {
  try {
    const cate = await Categories.findById({ _id: category });
    const newProduct = new Product({
      name: name,
      category: cate,
      price: price,
      size: size,
      origin: origin,
      quantity: quantity,
      image: image,
    });
    const result = await newProduct.save();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const update = async (id, name, price, size, category, image, origin, quantity) => {
  const update_product = await Product.findById((_id = id));
  const cate = await Categories.findById({ _id: category });
  let result = null;
  try {
    if (update_product) {
      update_product.name = name ?? update_product.name;
      update_product.category = cate ?? update_product.category;
      update_product.price = price ?? update_product.price;
      update_product.size = size ?? update_product.size;
      update_product.origin = origin ?? update_product.origin;
      update_product.quantity = quantity ?? update_product.quantity;
      update_product.image = image ?? update_product.image;
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

module.exports = { list, add, update, del, findByName };
