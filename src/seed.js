const path = require('path');
const {Seeder} = require('mongo-seeding');
const {MONGO_HOST, MONGO_PORT, MONGO_COLLECTION} = require('./constants');
const {getLogger} =  require('./utils/helper');

const logger = getLogger('MongoDB seed');

const config = {
  database: {
    host: MONGO_HOST,
    port: MONGO_PORT,
    name: MONGO_COLLECTION,
  },
  dropCollections: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('./build/seeds'));

seeder
  .import(collections)
  .then(() => {
    logger.error('MongoDB populated correctly');
  })
  .catch(err => {
    logger.error({error: err}, 'mongoDB seeder error.');
    throw err;
  });
