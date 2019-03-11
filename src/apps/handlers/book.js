import {OK, wrapError} from '../responses';

export const read = async function({query}, {logger}) {
  try {
    const book = await this.book.getById(query.id);

    return OK(book);
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving book');
    return wrapError(e);
  }
};

export const readBookPage = async function({query}, {logger}) {
  try {
    const book = await this.book.getById(query.id);
    const page = await this.page.getOne({
      book_id: book.id,
      number: query.number,
      format: query.format,
    });

    return OK(page.content);
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving book page');
    return wrapError(e);
  }
};

export const list = async function({logger}) {
  try {
    const books = await this.book.getMany();

    return OK({
      items: books || [],
    });
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving book list');
    return wrapError(e);
  }
};

export const create = async function({payload}, {logger}) {
  try {
    const book = await this.book.create(payload);

    return OK(book);
  } catch (e) {
    logger.trace(e, 'something went wrong creating book');
    return wrapError(e);
  }
};

export const update = async function({query, payload}, {logger}) {
  try {
    const book = await this.book.update(query.id, payload);

    return OK(book);
  } catch (e) {
    logger.trace(e, 'something went wrong updating book');
    return wrapError(e);
  }
};