var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/add', function (req, res, next) {

  //object destructinng es6
  const { name, nic, email } = req.body;

  const query = `INSERT INTO users VALUES ('${name}','${nic}','${email}')`;
  dbConnection.query(query, function (err, results, fields) {
    console.log(results);
  });
  res.send(`Im ${name}`);
});

// router to test database 'new'
router.post('/new', function (req, res, next) {

  //object destructinng es6
  const { id, names, mail } = req.body;

  req.body.id

  const query = `INSERT INTO new VALUES ('${id}','${names}','${mail}')`;
  dbConnection.query(query, function (err, results, fields) {
    console.log(results);
  });
});

module.exports = router;
