const mongoose = require('mongoose');

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
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;