var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var farmerRouter = require("./routes/farmer");
var keellsRouter = require("./routes/keells");
var doaRouter = require("./routes/doa");
var listingRouter = require("./routes/listing");

require("dotenv").config();

// Database connection
// mysql node package manager to connect
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "abcd",
  database: "webapp",
});

connection.connect();
global.dbConnection = connection;

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/farmer", farmerRouter);
app.use("/keells", keellsRouter);
app.use("/doa", doaRouter);
app.use("/listing", listingRouter);

module.exports = app;
