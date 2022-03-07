// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, book) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {title: 'Books',book: book
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/add', {title: 'Add Books',book:'' });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    let newbook = books({
      "title": req.body.title,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre


    });

    books.create(newbook, (err, books) => {
      if(err)
      {
        console.log(err)
        res.send(err);
      }
      else
      {
        res.redirect('/books');
      }

    });

  

   
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

  let id = req.params.id;
  books.findById(id, (err, booktoedit)=>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('books/edit', {title: 'edit book', book: booktoedit})
    }
  });
   
});

// POST - process the information passed from the details form and update the document
router.post('views/books/edit:id', (req, res, next) => {
  let id = req.params.id;
  let updatebook= book({
          "id": id,
          "title": req.body.title,
          "price": req.body.price,
          "author": req.body.author,
          "genre": req.body.genre

  });
  book. updateOne({_id: id}, updatebook, (err) => {

    if (err)
    {
      console.log(err)
      res.end(err);
    }
    else{
      res.redirect('/books');
    }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    let id =req.params.id;
    book.remove({_id: id},(err)=>{
      if(err)
      {
        console.log(err)
      res.end(err);
        
      }
      else
      {
        res.redirect('/books');

      }
    });
});


module.exports = router;
