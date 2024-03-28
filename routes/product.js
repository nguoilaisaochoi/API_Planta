var express = require("express");
var router = express.Router();

const upload = require("../config/upload");
const product_control = require("../modules/product/product_control");
router.get("/list", async (req, res) => {
  let result;
  try {
    result = await product_control.list();
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/listbyid", async (req, res) => {
  try {
    const { _id } = req.query;
    console.log(_id);
    let result;
    result = await product_control.listid(_id);
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    let result = await product_control.add(data);
    if (result) {
      res.json(result);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/update", async (req, res) => {
  const data = req.body;
  let result = await product_control.update(data);
  if (result) {
    res.json(result);
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
