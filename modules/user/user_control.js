const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
Usermodel = require("../user/user");
const jwt = require("jsonwebtoken");
const user = require("../user/user");

const login = async (email, password) => {
  const user = await Usermodel.findOne({ email });
  if (user && bcryptjs.compareSync(password, user.password)) {
    return user;
  }
};

const reg = async (name, email, phone, password) => {
  try {
    let result;
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const checkemail = await Usermodel.findOne({ email: email });
    console.log(checkemail);
    if (checkemail) {
      result = 400;
    } else {
      const newUser = new Usermodel({
        name,
        email,
        phone,
        password: hashPassword,
        address: "trống",
      });
      result = await newUser.save();
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
const list = async (_id) => {
  let user;
  if (_id) {
    user = await Usermodel.findById(_id);
  } else {
    user = await Usermodel.find({});
  }
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

const update = async (name, email, address, phone) => {
  try {
    let result;
    const check = await user.findOne({ email });
    if (check) {
      check.name = name ?? check.name;
      check.phone = phone ?? check.phone;
      check.address = address ?? check.address;
      result = await check.save();
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const del = async (id) => {
  try {
    const user = await Usermodel.deleteOne({ _id: id });
    return user;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { login, reg, list, changepass, del, update };
