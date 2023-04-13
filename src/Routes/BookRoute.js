const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require("../Model/BookModel");
const authMiddleware=require("../middlewares/authMiddleware");
const BookShelf=require("../Model/BookShelfModel");

const BookRouter = express.Router();


//get Books

BookRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const book = await Book.find({});
      const bookShelf = await BookShelf.find({});
      
      if (book) {
        res.status(200);
        res.json({book,bookShelf});
      } else {
        res.status(500);
        throw new Error('There are no books');
      }
    })
  );

//Create Book
BookRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const book = await Book.create(req.body);

    if (book) {
      res.status(200);
      res.json(book);
    } else {
      res.status(500);
      throw new Error('Book creating failed');
    }
  })
);

BookRouter.post('/addtoshelf',expressAsyncHandler(async (req, res) => {
  let bookshelf = await BookShelf.findOne({bookid: req.body._id ,userid: req.body.userid} );
  const {startreading,_id,userid} = req.body;
  
    if(startreading)
    bookshelf=  await BookShelf.create({bookid:_id,userid:userid});
    else
    {
      if(bookshelf)
         await BookShelf.findByIdAndDelete(bookshelf._id);
    }
    res.status(200);
    res.json(bookshelf);
})
);
BookRouter.get('/userbookshelf:id',expressAsyncHandler(async (req, res) => {



})
)


//get book by id for updating 
BookRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200);
      res.json(updatedBook);
    } else {
      res.status(500);
      throw new Error('Update failed');
    }
  })
);


//delete book  using their id 

BookRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      res.status(200);
      res.send(book);
    } catch (error) {
      res.json(error);
    }
  })
);

module.exports = BookRouter;