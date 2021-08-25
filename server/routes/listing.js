var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

router.post(
  "/add",
  multer({ storage: storage }).single("item_image"),
  function (req, res, next) {
    const {
      item_type,
      item_name,
      item_quantity,
      item_description,
      item_lat,
      item_lon,
      farmer_id,
    } = req.body;
    const { filename } = req.file;

    const query = `INSERT INTO listing (item_type, item_name, item_quantity, item_description, item_image, item_lat, item_lon, farmer_id) 
        VALUES ('${item_type}','${item_name}','${item_quantity}','${item_description}','${filename}','${item_lat}','${item_lon}','${farmer_id}')`;
    dbConnection.query(query, function (err, results, fields) {
      if (err) {
        console.log("error", err);
        res.status(500).json(err);
      }
      console.log("result", results);
      res.status(200).json(results);
    });
  }
);

router.post(
  "/:id",
  multer({ storage: storage }).single("item_image"),
  function (req, res, next) {
    const { id } = req.params;
    const {
      item_type,
      item_name,
      item_quantity,
      item_description,
      item_lat,
      item_lon,
      farmer_id,
    } = req.body;
    const { filename: item_image } = req.file;

    const query = `UPDATE listing SET item_type='${item_type}', item_name='${item_name}', item_quantity='${item_quantity}', item_description='${item_description}', item_image='${item_image}', item_lat='${item_lat}', item_lon='${item_lon}' WHERE item_id=${id}`;

    dbConnection.query(query, function (err, results, fields) {
      if (err) {
        console.log("error", err);
        return res.status(500).json(err);
      }
      console.log("result", results);
      res.status(200).json(results);
    });
  }
);

router.get("/:id/accept", function (req, res, next) {
  const { id } = req.params;

  const query = `UPDATE listing SET item_status='ACCEPTED' WHERE item_id=${id}`;

  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      return res.status(500).json(err);
    }
    console.log("result", results);
    res.status(200).json(results);
  });
});

router.get("/:id/reject", function (req, res, next) {
  const { id } = req.params;

  const query = `UPDATE listing SET item_status='REJECTED' WHERE item_id=${id}`;

  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      return res.status(500).json(err);
    }
    console.log("result", results);
    res.status(200).json(results);
  });
});

//raq parames
router.delete("/:id", function (req, res, next) {
  const { id } = req.params;

  const query = `DELETE FROM listing WHERE item_id=${id}`;

  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      return res.status(500).json(err);
    }
    console.log("result", results);
    res.status(200).json(results);
  });
});

// dynamic queries
router.get("/", function (req, res, next) {
  const { farmerId, dateFrom, status } = req.query;
  let multipleConditions = false;
  let query =
    "SELECT listing.*, farmer.email, farmer.phone FROM listing LEFT JOIN farmer ON listing.farmer_id = farmer.nic";

  if (farmerId) {
    query = query + ` WHERE farmer_id='${farmerId}'`;
    multipleConditions = true;
  }
  console.log(dateFrom);
  if (dateFrom) {
    if (dateFrom === "today") {
      query =
        query +
        ` ${multipleConditions ? "AND" : "WHERE"} item_date >= CURDATE()`;
    } else if (dateFrom === "week") {
      query =
        query +
        ` ${
          multipleConditions ? "AND" : "WHERE"
        } item_date  >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`;
    }
    multipleConditions = true;
  }

  if (status) {
    let ustatus = status.toUpperCase();
    query =
      query +
      ` ${multipleConditions ? "AND" : "WHERE"} item_status = '${ustatus}'`;
  }

  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      res.json(err);
    }
    console.log("result", results);
    res.json(results);
  });
});

router.get("/countByType", function (req, res, next) {
  let query =
    "SELECT item_type,count(item_id) as count FROM listing group by item_type";
  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      return res.json(err);
    }
    console.log("result", results);
    return res.json(results);
  });
});

router.get("/countByStatus", function (req, res, next) {
  let query =
    "SELECT item_status,count(item_id) as count FROM listing group by item_status";
  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      return res.json(err);
    }
    console.log("result", results);
    return res.json(results);
  });
});

router.get("/countByDate", function (req, res, next) {
  let query =
    "SELECT count(item_status) as count, DATE(item_date) as date, item_status FROM listing  where item_date >= date_sub(curdate() , INTERVAL 7 DAY) group by DATE(item_date), item_status";
  dbConnection.query(query, function (err, results, fields) {
    if (err) {
      console.log("error", err);
      return res.json(err);
    }
    console.log("result", results);
    return res.json(results);
  });
});
//
module.exports = router;
