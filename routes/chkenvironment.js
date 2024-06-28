var express = require("express");
var router = express.Router();

router.get("/chk", async (req, res) => {
  return res.json("result");
});
module.exports = router;
