const path = require('path');
const {Seeder} = require('mongo-seeding');
const {MONGO_URI} = require('./constants');
const {getLogger} =  require('./utils/helper');

const logger = getLogger('MongoDB seed');

const config = {
  database: MONGO_URI,
  dropCollections: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('./build/seeds'));

console.log('COLLECTIONS', collections); //eslint-disable-line

seeder
  .import(collections)
  .then(() => {
    logger.error('MongoDB populated correctly');
  })
  .catch(err => {
    logger.error({error: err}, 'mongoDB seeder error.');
    throw err;
  });
