import {OK, wrapError} from '../responses';

export const read = async function({query}, {logger}) {
  try {
    const genre = await this.genre.getById(query.id);

    return OK(genre);
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving genre');
    return wrapError(e);
  }
};

export const list = async function({logger}) {
  try {
    const genres = await this.genre.getMany();

    return OK({
      items: genres || [],
    });
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving genre list');
    return wrapError(e);
  }
};

export const create = async function({payload}, {logger}) {
  try {
    const genre = await this.genre.create(payload);

    return OK(genre);
  } catch (e) {
    logger.trace(e, 'something went wrong creating genre');
    return wrapError(e);
  }
};

export const update = async function({query, payload}, {logger}) {
  try {
    const genre = await this.genre.update(query.id, payload);

    return OK(genre);
  } catch (e) {
    logger.trace(e, 'something went wrong updating genre');
    return wrapError(e);
  }
};