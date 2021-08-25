var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var { Types } = require("../util/accTypes");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ id: dbConnection.threadId });
});

router.post("/signin", function (req, res, next) {
  const { username, password } = req.body;
  let query = "";
  let type = "";
  if (username.charAt(0) === "K") {
    query = `SELECT k_id as id, k_name as name FROM keells WHERE k_id='${username}' AND k_password='${password}'`;
    type = Types.KEELLS;
  } else if (username.charAt(0) === "D") {
    query = `SELECT doa_id as id, doa_name as name FROM doa WHERE doa_id='${username}' AND doa_password='${password}'`;
    type = Types.DOA;
  } else if (username.charAt(0) === "A") {
    query = `SELECT admin_id as id, admin_name as name FROM admin WHERE admin_id='${username}' AND admin_password='${password}'`;
    type = Types.ADMIN;
  } else {
    query = `SELECT nic as id, name FROM farmer WHERE nic='${username}' AND password='${password}'`;
    type = Types.FARMER;
  }
  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      res.status(500).json(err);
    }
    if (results.length === 1) {
      const payload = { ...results[0], type: type };
      jwt.sign(payload, process.env.JWT_SECRET, function (err, token) {
        if (err) {
          return res.status(500).json({ msg: "ERR_GENERATING_TOKEN" });
        }
        console.log(results);
        return res.status(200).json({ data: payload, token: token });
      });
    } else {
      return res.status(400).json({ msg: "INVALID_CREDENTIALS" });
    }
  });
});

module.exports = router;
