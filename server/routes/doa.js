var express = require("express");
var router = express.Router();

router.post("/add", function (req, res, next) {
  const { doa_id, doa_name, doa_phone, doa_email, doa_password } = req.body;

  const query = `INSERT INTO doa VALUES ('${doa_id}','${doa_name}','${doa_phone}','${doa_email}','${doa_password}')`;
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
