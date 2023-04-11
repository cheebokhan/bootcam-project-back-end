const mongoose = require('mongoose');
const User=require('./User');

const BookSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
      },
    author: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: [true, 'Book category is required'],
      },
      booktype: {
        type: String,
        required: true,
      },
      bookdescription: {
        type: String,
        required: true,
      },
      bookimage:{
        type:String,
        
      },
      startreading:{
        type:Boolean,

      },
        createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;