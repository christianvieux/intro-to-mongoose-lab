// models/Customers.js
const mongoose = require('mongoose');
const CustomersSchema = new mongoose.Schema({
    name: String,
    age: Number,
  });

const Customers = mongoose.model('Customers', CustomersSchema);




module.exports = Customers;