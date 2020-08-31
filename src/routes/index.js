const adminApis = require('./admin');
const hcheck = require('./hcheck');

module.exports = function routes(app) {
  app.use('/api/_hcheck', hcheck);
  app.use('/admin/', adminApis);
};
