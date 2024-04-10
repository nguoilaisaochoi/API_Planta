const mongoose = require("mongoose");

AdminModel = require("../admin/admin");

const login = async (email, password) => {
  try {
    const check = await AdminModel.findOne({ email, password });
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
const changepass = async (email, passold, passnew) => {
  try {
    const check = await AdminModel.findOne({ email, password: passold });
    let result = null;
    if (check) {
      check.password = passnew ?? check.password;
      result = await check.save();
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { login, reg, changepass };
