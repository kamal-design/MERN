const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
  .populate("category") //sort or populate use
  .exec((err, product) => {
    if(err){
      return res.status(400).json({
        error: "Product not found"
      })
    }
    req.product = product;
    next();
  });
};

//create product
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtension = true;
  
  form.parse(req, (err, fields, file) => {
    if(err){
      return res.status(400).json({
        error: "Problem with image."
      });
    }

    //destructure the fields
    const {name, description, price, category, stock } = fields;

    if(!name || !description || !price || !category || !stock ) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields)

    //handle file here
    if(file.photo) {
      if(file.photo.size > 3000000){ //3mb
        return res.status(400).json({
          error: "File size too big!"
        })
      }
      
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product);

    //save to the Database
    product.save((err, product) => {
      if(err){
        res.status(400).json({
          error: "Saving tshirt in Database failed"
        })
      }
      res.json(product);
    })

  });
};

//get single product
exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
}

//Middleware
exports.photo = (req, res, next) => {
  if(req.product.photo.data){
    res.set("Content-Type", req.product.photo.contentType)
    return res.send(req.product.photo.data)
  }
  next();
}

//delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deleteProduct) => {
    if(err){
      return res.status(400).json({
        error: "Failed to delete the product"
      })
    }

    res.json({
      message: "Product deletion was a success",
      deleteProduct
    });
  });
}

//update controllers
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;
  
  form.parse(req, (err, fields, file) => {
    if(err){
      return res.status(400).json({
        error: "Problem with image."
      });
    }  

    //updateion code
    let product = req.product;
    product = _.extend(product, fields);

    //handle file here
    if(file.photo) {
      if(file.photo.size > 3000000){ //3mb
        return res.status(400).json({
          error: "File size too big!"
        })
      }
      
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //console.log(product);

    //save to the Database
    product.save((err, product) => {
      if(err){
        res.status(400).json({
          error: "Updataion of Product in Database failed"
        })
      }
      res.json(product);
    })

  });
}

//product Listing 
exports.getAllProducts = (req, res) => {
  //TODO: LOAD PRODUCT LIMITS SET
  // let limit = 8;
  let limit = req.query.limit ? parseInt(req.query.limit): 8 ;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
  .select("-photo")
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit(limit)
  .exec((err, products) => {
    if(err) {
      return res.status(400).json({
        error: " No product Found"
      });
    }
    res.json(products);
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if(err){
      return res.status(400).json({
        error: "No category Found"
      })
    }
    res.json(category);
  });
};


//sotck and sold update
exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map(prod => {
    return {
      updateOne: {
        filter: {_id: prod._id},
        update: {$inc: {stock: -prod.count, sold: +prod.count}}
      }
    }
  });

  product.bulkWrite(myOperation, {}, (err, product) => {
    if(err){
      return res.status(400).json({
        error: "Bulk Operation Failed"
      });
    }
  });
}