import {OK, wrapError} from '../responses';

export const read = async function({query}, {logger}) {
  try {
    const author = await this.author.getById(query.id);

    return OK(author);
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving author');
    return wrapError(e);
  }
};

export const list = async function({logger}) {
  try {
    const authors = await this.author.getMany();

    return OK({
      items: authors || [],
    });
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving author list');
    return wrapError(e);
  }
};

export const create = async function({payload}, {logger}) {
  try {
    const author = await this.author.create(payload);

    return OK(author);
  } catch (e) {
    logger.trace(e, 'something went wrong creating author');
    return wrapError(e);
  }
};

export const update = async function({query, payload}, {logger}) {
  try {
    const author = await this.author.update(query.id, payload);

    return OK(author);
  } catch (e) {
    logger.trace(e, 'something went wrong updating author');
    return wrapError(e);
  }
};