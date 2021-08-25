var express = require("express");
var router = express.Router();

router.post("/add", function (req, res, next) {
  const { k_id, k_name, k_phone, k_email, k_password } = req.body;

  const query = `INSERT INTO keells VALUES ('${k_id}','${k_name}','${k_phone}','${k_email}','${k_password}')`;
  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      res.status(500).json(err);
    }
    console.log("result", results);
    res.status(200).json(results);
  });
});

module.exports = router;
