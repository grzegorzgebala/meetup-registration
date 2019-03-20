// Dependencies
const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var Products = require('../models/product');

// MongoDB
mongoose.connect('mongodb://localhost/brainhub', { useNewUrlParser: true });

// Models
let Product = require('../models/product');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

router.get('/productsList', function(req, res, next){
	console.log('Get request for all productsList');
	Products.find({})
	.exec(function(err, productsList){
		if (err) {
			res.send("Error retrieving productsList");
		} else {
			res.json(productsList);
		}
	})
});

// Return router
module.exports = router;