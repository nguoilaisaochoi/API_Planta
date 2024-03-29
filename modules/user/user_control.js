const mongoose = require("mongoose");

Usermodel = require("../user/user");

const login = async (email, password) => {
  try {
    const check = await Usermodel.findOne({ email, password });
    console.log(check);
    return check;
  } catch (error) {
    console.log(error);
  }
};

const reg = async (name, email, phone, password) => {
  try {
    let result;
    const checkemail = await Usermodel.findOne({ email: email });
    console.log(checkemail);
    if (checkemail) {
      result = 400;
    } else {
      const newUser = new Usermodel({ name, email, phone, password });
      result = await newUser.save();
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
const list = async () => {
  const user = await Usermodel.find({});
  return user;
};
const changepass = async (email, passold, passnew) => {
  try {
    const check = await Usermodel.findOne({ email, password: passold });
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

const del = async (email) => {
  try {
    const user = await Usermodel.deleteOne({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { login, reg, list, changepass, del };
