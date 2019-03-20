//Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;

// Schema
const productSchema = new mongoose.Schema({
	name: String,
	surname: String,
	mail: String,
	date: Date,
	error: String
});

// Return model
module.exports = restful.model('Products', productSchema);