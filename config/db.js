const mongoose = require("mongoose");


mongoose
  .connect("mongodb+srv://nguoilaisaochoi:lehunghc4@apiplanta.ngdxpbb.mongodb.net/Data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));
