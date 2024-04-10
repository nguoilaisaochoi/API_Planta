var express = require("express");
var router = express.Router();
const modelcategory = require("./category");

const getAll = async () => {
  try {
    const categories = await modelcategory.find();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const getParent = async () => {
  try {
    const categories = await modelcategory.find({ parentId: null });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const getSub = async (parentId) => {
  try {
    const categories = await modelcategory.find(parentId).populate("parentId", "^_id:name");
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const add = async (name, parentId) => {
  try {
    const categories = new modelcategory({ name, parentId });
    await categories.save();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const update = async (catchId, name, parentId) => {
  try {
    const categories = await modelcategory.findByIdAndUpdate(catchId, { name, parentId });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

const del = async (catchId) => {
  let result;
  try {
    result = await modelcategory.deleteOne({ _id: catchId });
  } catch (error) {
    console.log(error);
  }
  return result;
};

module.exports = { getAll, getParent, getSub, add, update, del };
