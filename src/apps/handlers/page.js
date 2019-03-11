import {OK, wrapError} from '../responses';

export const read = async function({query}, {logger}) {
  try {
    const page = await this.page.getById(query.id);

    return OK(page);
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving page');
    return wrapError(e);
  }
};

export const list = async function({logger}) {
  try {
    const pages = await this.page.getMany();

    return OK({
      items: pages || [],
    });
  } catch (e) {
    logger.trace(e, 'something went wrong retrieving page list');
    return wrapError(e);
  }
};

export const create = async function({payload}, {logger}) {
  try {
    const page = await this.page.create(payload);

    return OK(page);
  } catch (e) {
    logger.trace(e, 'something went wrong creating page');
    return wrapError(e);
  }
};

export const update = async function({query, payload}, {logger}) {
  try {
    const page = await this.page.update(query.id, payload);

    return OK(page);
  } catch (e) {
    logger.trace(e, 'something went wrong updating page');
    return wrapError(e);
  }
};