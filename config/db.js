const mongoose = require("mongoose");


mongoose
  .connect("mongodb+srv://nguoilaisaochoi:12312311@apiplanta.ngdxpbb.mongodb.net/Data", {
  })
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));
