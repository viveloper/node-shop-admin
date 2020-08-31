const dotenv = require('dotenv');
const result = dotenv.config();
const logger = require('./common/logger');
const { APP_ID } = require('./common/config');
const routes = require('./routes');

const Server = require('./Server');

if (result.error) {
  throw result.error;
}

logger.debug(result.parsed);
logger.info('APP_ID:', APP_ID);

new Server('v1.0.0').router(routes).listen(9000);
