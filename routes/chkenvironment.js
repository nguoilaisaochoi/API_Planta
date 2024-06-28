var express = require("express");
var router = express.Router();


router.post("/chk", async (req, res) => {
  res.send("server starting");
});
module.exports = router;
