var express = require("express");
var router = express.Router();

const users_control = require("../modules/user/user_control");

//check render
router.get("/connect", async (req, res) => {
  try {
    res.json({ note: "Connected" });
  } catch (error) {
    console.log(error);
  }
}),
//đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let result = await users_control.login(email, password);
    if (result) {
      res.json({ messenger: "Đăng nhập thành công", data: result });
    } else {
      res.json({ messenger: "Thông tin đăng nhập không đúng", data: null });
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
    console.log(result);
    if (result !== 400) {
      res.json({ data: result });
    } else if (result == 400) {
      res.json({ data: null, messenger: "Email tồn tại" });
    }
  } catch (error) {
    console.log(error);
  }
});
//lấy danh sách
router.get("/list", async (req, res) => {
  const { _id } = req.query;
  try {
    let result = await users_control.list(_id);
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
      res.json("Đổi mk thành công");
    } else {
      res.json("Đổi mk thất bại");
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/update", async (req, res) => {
  try {
    const { name, email, address, phone } = req.body;
    const result = await users_control.update(name, email, address, phone);
    if (result) {
      res.json({ data: result });
    } else {
      res.json({ data: null });
    }
  } catch (error) {
    console.log(error);
  }
});
//xoá
router.post("/del", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await users_control.del(id);
    if (result.deletedCount >= 1) {
      res.json({
        message: "xoá thành công",
        data: result,
      });
    } else {
      res.json({
        message: "xoá thành công",
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
