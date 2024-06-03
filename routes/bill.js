var express = require("express");
var router = express.Router();
const bill_controler = require("../modules/bill/bill_controler");

router.post("/add", async (req, res,) => {
  const { iduser } = req.body;
  let result;
  try {
    result = await bill_controler.add(iduser);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const { iduser } = req.query;
    let result = await bill_controler.getAll(iduser);
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
