var express = require("express");
var router = express.Router();
const controller_category = require("../modules/categories/category_control");

router.post("/add", async (req, res, next) => {
  const { name } = req.body;
  let result;
  try {
    result = await controller_category.add(name, null);

    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});

router.get("/list", async (req, res) => {
  const id = req.body;
  try {
    let result = await controller_category.getAll(id);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});

router.post("/update", async (req, res) => {
  const { id, name } = req.body;
  try {
    let result = await controller_category.update(id, name);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ status: false, data: error.message });
  }
});

router.post("/del", async (req, res) => {
  const { id } = req.body;
  try {
    let result = await controller_category.del(id);
    console.log(result.deletedCount);
    if (result.deletedCount > 0) {
      res.json({ message: "Xoá thành công" });
    } else {
      res.json({ message: "Xoá thất bại" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, data: error.message });
  }
});
module.exports = router;
