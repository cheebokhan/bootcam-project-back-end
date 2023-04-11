const mongoose = require('mongoose');
const User=require('./User');
const Book=require('./BookModel');

const BookShelfSchema = new mongoose.Schema(
    {
      userid: {
          type: String,
          required: true,
        },
        bookid:{
            type:String,
            required:true
        }
    });



const BookShelf = mongoose.model('BookShelf', BookShelfSchema);

module.exports = BookShelf;