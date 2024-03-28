var express = require("express");
var router = express.Router();

const users_control = require("../modules/user/user_control");
//đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await users_control.login(email, password);
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
    const { name, email, phone, password } = req.body;
    let result = await users_control.reg(name, email, phone, password);
    if (result) {
      res.json({
        messenger: true,
        data: result,
      });
    } else {
      res.json({ status: 400, messenger: false });
    }
  } catch (error) {
    console.log(error);
  }
});
//lấy danh sách
router.get("/list", async (req, res) => {
  try {
    let result = await users_control.list();
    if (result) {
      res.json({ data: result });
    }
  } catch (error) {
    console.log(error);
  }
});
//đổi mật khẩu
router.post("/changepass", async (req, res) => {
  try {
    const { email, passold, passnew } = req.body;
    const result = await users_control.changepass(email, passold, passnew);
    if (result) {
      res.json({
        messenger: "Đổi mk thành công",
        data: result,
      });
    } else {
      res.json("Đổi mk thất bại");
    }
  } catch (error) {
    console.log(error);
  }
});
//xoá
router.post("/del", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await users_control.del(email);
    if (result.deletedCount >= 1) {
      res.json({
        messenger: "xoá thành công",
        data: result,
      });
    } else {
      res.json("Xoá thất bại");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
