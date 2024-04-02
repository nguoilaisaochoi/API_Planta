var express = require("express");
var router = express.Router();

const admin_control = require("../modules/admin/admin_control");
//đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await admin_control.login(email, password);
    if (result) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error);
  }
});
//form web
router.get("/dn", function (req, res) {
  res.render("login");
});

router.post("/dnprocess", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await admin_control.login(email, password);
    if (result) {
      res.render("index");
    } else {
      res.render("login", { msg: "Đăng nhập thất bại" });
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
        status: true,
        data: result,
      });
    } else {
      res.json({ status: 400, messenger: "ĐK không thành công" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/changepass", async (req, res) => {
  try {
    const { email, passold, passnew } = req.body;
    const result = await admin_control.changepass(email, passold, passnew);
    if (result) {
      res.json({
        status: true,
        messenger: "Đổi mk thành công",
        data: result,
      });
    } else {
      res.json({
        status: false,
        messenger: "Đổi mk thất bại",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
