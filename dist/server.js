"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const port = 3000;

_app2.default.listen(port, () => {
  console.log();
  console.log(`Escutando na porta: ${port}`);
  console.log(`CTRL + Click -> http://localhost:${port}`);
});
