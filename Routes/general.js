const router = require('express').Router();
const Books  = require('../Routes/booksdb.js');
let Users    = require('./auth_users.js') 
const uuid = require('uuid');

router.post('/register', (req, res) => {  
    // let users = Users.isValid(req.body.username);
    // if(Users.authenticated(req.body.username, req.body.password))
    //   return res.status(300).json({message: "customer already exists"});

    let newUser = (req.body);
    newUser.customerId = uuid.v4();
    Users.users.push(newUser);
    console.log(newUser);
    return res.status(200).json({message: "customer  successfully registered, Now you can login"});
}); // Register a new user
  
// Get the book list available in the shop
router.get('/',function (req, res) {
     let books = Books.Books;
    return res.status(200).json({books:books});
  });

// Get book details based on ISBN
router.get('/isbn/:isbn',function (req, res) {
    let books = Books.Books;
    let isbn = req.params.isbn;
    let book = Object.keys(books).filter((book)=> (book == isbn));
    return res.status(200).json(books[book]);
   });
    
  // Get book details based on author
router.get('/author/:author',function (req, res) {
    let books = Books.Books;
    let author = req.params.author;
    let book =  Object.keys(books).filter((book)=>  books[book].author == author);
    book = book.map((data)=>{
       let res = books[data];
       return {
        'ispn': data,
        "title": res.title,
        "reviews": res.reviews
       }
    })
    
    return res.status(300).json({booksbyauthor: book});
  });
  
  // Get all books based on title
router.get('/title/:title',function (req, res) {
    let books = Books.Books;
    let title = req.params.title;
    let book =  Object.keys(books).filter((book)=>  books[book].title == title);
    //Write your code here
    return res.status(300).json({BookByTitle: books[book]});
  });
  
  //  Get book review
router.get('/review/:isbn',function (req, res) {
    let books = Books.Books;  
    let isbn = req.params.isbn;
    let book = Object.keys(books).filter((book)=> (book == isbn));
    //Write your code here
    return res.status(300).json(books[book].reviews);

  });
  
module.exports = router;