const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require("multer");

const { auth } = require("../middleware/auth");

const storage = multer.diskStorage({
  // where we want to save or file
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  // how we will name the file??
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // validation
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".jpeg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, jpeg, png are allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  // after getting image from client, then we to save it with Multer

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.fieldname,
    });
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  // save all data from the client to database
  const product = new Product(req.body);

  product.save((err) => {
    // if fail
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    // if success
    return res.status(200).json({ success: true });
  });
});

router.post("/getProducts", (req, res) => {
  let { order, sortBy, searchTerm } = req.body;
  order = order ? order : "desc";
  sortBy = sortBy ? sortBy : "-1";

  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let findArgs = {};
  // let term = req.body.searchTerm;

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          // greater than
          $gte: req.body.filters[key][0],
          // less than
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (searchTerm) {
    Product.find(findArgs)
      .find({ $text: { $search: searchTerm } })
      .populate("writer")
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });

        return res
          .status(200)
          .json({ success: true, postSize: products.length, products });
      });
  } else {
    Product.find(findArgs)
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err });

        return res
          .status(200)
          .json({ success: true, products, postSize: products.length });
      });
  }
});

// id=${productId}&type=single
router.get("/products_by_id", (req, res) => {
  let { type, id: productId } = req.query;

  if (type === "array") {
    let productIds = productId.split(",");
    productId = [];
    productId = [...productIds];
  }

  // find single data record from DB by using this productId
  Product.find({ _id: { $in: productId } })
    .populate("writer")
    .exec((err, product) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(product);
    });
});

module.exports = router;
