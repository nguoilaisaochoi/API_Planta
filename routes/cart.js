var express = require("express");
var router = express.Router();
const cart_controler = require("../modules/cart/cart_controler");

router.post("/add", async (req, res, next) => {
  const { iduser, idproduct, quantitybuy, productprice } = req.body;
  let result;
  try {
    result = await cart_controler.add(iduser, idproduct, quantitybuy, productprice);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});

router.post("/update", async (req, res, next) => {
  const { iduser, idproduct, quantitybuy, productprice } = req.body;
  let result;
  try {
    result = await cart_controler.update(iduser, idproduct, quantitybuy, productprice);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});

router.get("/list", async (req, res) => {
  const { iduser } = req.query;
  try {
    let result = await cart_controler.list(iduser);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});
router.post("/del", async (req, res) => {
  const { iduser, idproduct } = req.body;
  try {
    let result = await cart_controler.del(iduser, idproduct);
    return res.json({ data: result });
  } catch (error) {
    return res.json({ data: error.message });
  }
});
module.exports = router;
