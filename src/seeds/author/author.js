import {ObjectID} from 'bson';

const authors = [
  {
    first_name: 'Fyodor',
    last_name: 'Dostoevsky',
    birth_date: '1991-02-07T04:00:00.000Z',
  },
];

const authorsData = authors.map((author) => ({
  _id: new ObjectID(),
  ...author,
}));

module.exports = authorsData;