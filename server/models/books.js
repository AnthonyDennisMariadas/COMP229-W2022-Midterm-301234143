let mongoose = require('mongoose');

// create a model class
let book = mongoose.Schema({
    title: String,
    price: Number,
    author: String,
    genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', book);
