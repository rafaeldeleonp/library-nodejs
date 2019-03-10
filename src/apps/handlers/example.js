import {OK, wrapError} from '../responses';

export const read = async function({query}, {logger}) {
  try {
    const example = await this.example.getById(query.id);

    return OK(example);
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving example');
    return wrapError(e);
  }
};

export const list = async function({logger}) {
  try {
    const examples = await this.example.getMany();

    return OK({
      items: examples || [],
    });
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving example list');
    return wrapError(e);
  }
};

export const create = async function({payload}, {logger}) {
  try {
    const example = await this.example.create(payload);

    return OK(example);
  } catch (e) {
    logger.trace(e, 'something went wrong creating example');
    return wrapError(e);
  }
};

export const update = async function({query, payload}, {logger}) {
  try {
    const example = await this.example.update(query.id, payload);

    return OK(example);
  } catch (e) {
    logger.trace(e, 'something went wrong updating example');
    return wrapError(e);
  }
};