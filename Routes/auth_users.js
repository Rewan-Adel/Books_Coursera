const express = require('express');
const jwt = require('jsonwebtoken');
let Books = require("./booksdb.js");
const router = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  if(String(username).length >= 5) return true;
  else return false;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.find( element => element.username == username && element.password == password )
}

//only registered users can login
router.post("/login", (req,res) => {
  isValid(req.body.username);
  let user = authenticatedUser(req.body.username,req.body.password);

  if(user){
    req.session.customerId = user.customerId;
    console.log("session ",req.session.customerId );
   return res.status(200).json("customer successfully logged in ");
  }
else  return res.status(300).json( "Invalid username/password");
 
});

// Add a book review
router.put("/auth/review/1?:review", (req, res) => {
  //Write your code here
  let books = Books.Books;
  let review = req.params.review;
  let book = Object.keys(books).filter((book)=> (book == 1));
  books[book].reviews = review;
  return res.status(200).send("the review for the book with ISBN 1 has been added/updated");
});

router.delete("/auth/review/1", (req, res) => {
  //Write your code here
  let books = Books.Books;
  let book = Object.keys(books).filter((book)=> (book == 1));
  if(books[book].reviews.length == 0) return res.status(300).send("No reviews for the ISBN 1posted by the user test");
  if (book && book.reviews && book.reviews.length > 0) { books[book].reviews.pop();}
  return res.status(200).send("Reviews for the ISBN 1posted by the user test deleted");
});

exports.authenticated = router;
exports.isValid = isValid;
exports.users = users;