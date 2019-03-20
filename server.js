// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// MongoDB
mongoose.connect('mongodb://localhost/brainhub', { useNewUrlParser: true });

// Express
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api', require('./routes/api'));
app.use('/api/poroductsList', require('./routes/api'));

// Start server
app.listen(4000);
console.log('Api is running on port 4000');