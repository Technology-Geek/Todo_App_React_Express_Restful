/*****************
 * @Dependencies *
 *****************/

//Environment Variable Manager
const dotenv = require('dotenv');

/***************************
 * @InitializeDependencies *
 ***************************/

//Initialize dotenv with configuration file path
dotenv.config({ path: 'configuration/.env' });

console.log('********************* Environment Ready *********************');

/***********************
 * @ConfigurationSetUp *
 ***********************/

//Configuration Object
const config = {
  mongo: {
    uri: process.env.mongoURI,
    dbName: process.env.mongoDBName
  },
  env: process.env.NODE_ENV || 'development',
  httpPort: process.env.PORT || process.env.httpPort
};

/************
 * @Exports *
 ************/

//Configuration Object
module.exports = config;
