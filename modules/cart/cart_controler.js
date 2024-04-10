var express = require("express");
var router = express.Router();
const cart = require("./cart");
const Product = require("../product/product");

const add = async (iduser, idproduct, quantitybuy, productprice) => {
  try {
    let newcart = await cart.findOne({ userId: iduser });
    console.log(newcart);
    const productfinded = await Product.findById(idproduct);
    console.log(productfinded);
    if (!newcart) {
      newcart = new cart({
        userId: iduser,
        products: [
          {
            productsId: idproduct,
            productname: productfinded.name,
            productimage: productfinded.image,
            productcategory: productfinded.category.name,
            productprice: productprice,
            quantity: quantitybuy,
          },
        ],
      });
    } else {
      const existingItem = newcart.products.find((item) => item.productsId == idproduct);
      if (existingItem) {
        existingItem.quantity += parseInt(quantitybuy);
        existingItem.productprice += parseInt(productprice);
      } else {
        //thêm một hoặc nhiều phần tử vào cuối mảng và trả về độ dài mới của mảng
        newcart.products.push({
          productsId: idproduct,
          productname: productfinded.name,
          productimage: productfinded.image,
          productcategory: productfinded.category.name,
          productprice: productprice,
          quantity: quantitybuy,
        });
      }
    }
    await newcart.save();

    return newcart;
  } catch (error) {
    console.log(error);
  }
};
const update = async (iduser, idproduct, quantitybuy, productprice) => {
  try {
    let findcart = await cart.findOne({ userId: iduser });
    let result=null
    const existingItem = findcart.products.find((item) => item.productsId == idproduct);
    if (existingItem) {
      existingItem.quantity = quantitybuy ?? existingItem.quantity;
      existingItem.productprice = productprice ?? existingItem.productprice;
      result = await findcart.save();
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
const list = async (iduser) => {
  try {
    let cartuser = await cart.findOne({ userId: iduser });
    return cartuser;
  } catch (error) {
    console.log(error);
  }
};

const del = async (userId, idproduct) => {
  try {
    let cartuser = await cart.findOne({ userId: userId });
    if (!cartuser) {
      return;
    }
    //kiểm tra nếu productId là mảng
    if (Array.isArray(idproduct)) {
      idproduct.map((productId) => {
        const indexToRemove = cartuser.products.findIndex((item) => item.productsId == productId);
        if (indexToRemove !== -1) {
          cartuser.products.splice(indexToRemove, 1);
        }
      });
    } else {
      const indexToRemove = cartuser.products.findIndex((item) => item.productsId == idproduct);
      if (indexToRemove !== -1) {
        cartuser.products.splice(indexToRemove, 1);
      }
    }

    await cartuser.save();
    return cartuser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = { add, del, list, update };
