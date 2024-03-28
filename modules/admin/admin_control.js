const mongoose = require("mongoose");

AdminModel = require("../admin/admin");

const login = async (email, password) => {
  try {
    const check = await AdminModel.findOne({ email, password });
    console.log(check);
    return check;
  } catch (error) {
    console.log(error);
  }
};

const reg = async (email, password) => {
  try {
    const newAdmin = new AdminModel({ email, password });
    const result = await newAdmin.save();
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { login, reg };
