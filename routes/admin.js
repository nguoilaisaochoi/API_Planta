var express = require("express");
var router = express.Router();

const admin_control = require("../modules/admin/admin_control");
//đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await admin_control.login(email, password);
    if (result) {
      res.json({ messenger: true });
    } else {
      res.json({ messenger: false });
    }
  } catch (error) {
    console.log(error);
  }
});
//đăng kí
router.post("/reg", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await admin_control.reg(email, password);
    if (result) {
      res.json({
        messenger: "Đăng kí thành công",
        data: result,
      });
    } else {
      res.json({ status: 400, messenger: "ĐK không thành công" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
