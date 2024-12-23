var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cron = require("node-cron");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/category");
var productRouter = require("./routes/product");
var billRouter = require("./routes/bill");
var adminRouter = require("./routes/admin");
var cardRouter = require("./routes/cart");
var chkenvironment = require("./routes/chkenvironment");
//connect mongodb
const database = require("./config/db");
const { default: axios } = require("axios");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/bill", billRouter);
app.use("/admin", adminRouter);
app.use("/cart", cardRouter);
app.use("", chkenvironment);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const fetchAPI = async () => {
  try {
    await axios.get("https://api-planta-sa.onrender.com/user/connect");
  } catch (error) {
    console.error("Error fetching API:", error.message);
  }
};

//call sever
cron.schedule("*/2 * * * *", () => {
  fetchAPI();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
