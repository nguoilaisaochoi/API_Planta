var express = require("express");
var router = express.Router();
const controller_category = require("../modules/categories/category_control");

router.post("/add", async (req, res, next) => {
  const { name, parentId } = req.body;
  console.log(name)
  console.log(parentId)
  let result;
  try {
    if (!parentId) {
      result = await controller_category.add(name, null);
    } else {
      result = await controller_category.add(name, parentId);
    }
    return res.json({ message: "Thêm thành công" });
  } catch (error) {
    return res.json({ message: "Thêm thất bại" });
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
router.get("/getparent", async function (req, res) {
  try {
    const categories = await controller_category.getParent();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
