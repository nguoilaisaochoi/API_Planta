var express = require("express");
var router = express.Router();
const bill_controler = require("../modules/bill/bill_controler");

router.post("/addcart", async (req, res, next) => {
  const data = req.body;
  let result;
  try {
    result = await bill_controler.add(data);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    let result = await bill_controler.getAll();
    return res.json(result);
  } catch (error) {
    return res.json({ data: error.message });
  }
});



router.post("/del", async (req, res) => {
  const id = req.body;
  try {
    let result = await bill_controler.del(id);
    if (result.deletedCount > 0) {
      return res.json("Xoá thành công");
    }
  } catch (error) {
    return res.json({ data: error.message });
  }
});

module.exports = router;
