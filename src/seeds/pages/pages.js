const books = require('../books/books');
import {ObjectID} from 'bson';

const pages = [
  {
    content: 'CONTENT',
    number: 1,
  },
];

const pagesData = pages.map((page) => ({
  _id: new ObjectID(),
  book_id: books[0]._id,
  content: page.content,
  number: page.number,
}));

module.exports = pagesData;