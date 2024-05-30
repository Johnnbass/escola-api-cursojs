"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class TokenController {
  async store(req, res) {
    const tokenErrorMsg = "Credenciais inválidas.";

    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: [tokenErrorMsg],
      });
    }

    const user = await _User2.default.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        errors: [tokenErrorMsg],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: [tokenErrorMsg],
      });
    }

    const { id } = user;

    const payload = { id, email };
    const secret = process.env.TOKEN_SECRET;
    const options = { expiresIn: process.env.TOKEN_EXPIRATION };

    const token = _jsonwebtoken2.default.sign(payload, secret, options);

    res.json({ token });
  }
}

exports. default = new TokenController();
