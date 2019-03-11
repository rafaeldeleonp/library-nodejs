import {ObjectID} from 'bson';

const authors = [
  {
    first_name: 'Fyodor',
    last_name: 'Dostoevsky',
    born: '1821-11-11T04:00:00.000Z',
    died: '1881-02-09T04:00:00.000Z',
  },
  {
    first_name: 'William',
    last_name: 'Shakespeare',
    born: '1564-04-23T04:00:00.000Z',
    died: '1616-04-23T04:00:00.000Z',
  },
  {
    first_name: 'Charles',
    last_name: 'Dickens',
    born: '1812-02-07T04:00:00.000Z',
    died: '1870-01-09T04:00:00.000Z',
  },
  {
    first_name: 'Leo',
    last_name: 'Tolstoy',
    born: '1821-11-11T04:00:00.000Z',
    died: '1881-02-09T04:00:00.000Z',
  },
  {
    first_name: 'George',
    last_name: 'Orwell',
    born: '1903-06-25T04:00:00.000Z',
    died: '1950-01-21T04:00:00.000Z',
  },
  {
    first_name: 'Edgar Allan',
    last_name: 'Poe',
    born: '1809-01-19T04:00:00.000Z',
    died: '1849-10-0702T04:00:00.000Z',
  },
  {
    first_name: 'J. R. R.',
    last_name: 'Tolkien',
    born: '1892-01-03T04:00:00.000Z',
    died: '1973-09-02T04:00:00.000Z',
  },
  {
    first_name: 'Mark',
    last_name: 'Twain',
    born: '1835-11-30T04:00:00.000Z',
    died: '1910-04-21T04:00:00.000Z',
  },
  {
    first_name: 'Victor',
    last_name: 'Hugo',
    born: '1802-02-26T04:00:00.000Z',
    died: '1885-05-22T04:00:00.000Z',
  },
  {
    first_name: 'Oscar',
    last_name: 'Wilde',
    born: '1854-10-16T04:00:00.000Z',
    died: '1900-11-30T04:00:00.000Z',
  },
];

const authorsData = authors.map((author) => ({
  _id: new ObjectID(),
  ...author,
}));

module.exports = authorsData;