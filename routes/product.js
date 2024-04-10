var express = require("express");
var router = express.Router();

const upload = require("../config/upload");
const product_control = require("../modules/product/product_control");
router.get("/list", async (req, res) => {
  let result;
  const { _id } = req.query;
  try {
    result = await product_control.list(_id);
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/find", async (req, res) => {
  try {
    const { name } = req.query;
    let result = await product_control.findByName(name);
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, price, size, category, image, origin, quantity } = req.body;
    let result = await product_control.add(name, price, size, category, image, origin, quantity);
    if (result) {
      res.json({ message: "Thêm thành công" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
  const { id, name, price, size, category, image, origin, quantity } = req.body;
  let result = await product_control.update(
    id,
    name,
    price,
    size,
    category,
    image,
    origin,
    quantity
  );
  if (result) {
    res.json({ message: "Cập nhật thành công" });
  } else {
    res.json({ message: "Cập nhật thất bại" });
  }
});
router.post("/del", async (req, res) => {
  const { id } = req.body;
  try {
    let result = await product_control.del(id);
    console.log(result);
    if (result.deletedCount > 0) {
      res.json({ message: "Xoá thành công" });
    } else {
      res.json({ message: "Xoá thất bại" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
