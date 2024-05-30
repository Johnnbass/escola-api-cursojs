"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _Upload = require('../models/Upload'); var _Upload2 = _interopRequireDefault(_Upload);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single("upload");

class UploadController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;
        const upload = await _Upload2.default.create({
          originalname,
          filename,
          aluno_id,
        });

        return res.json(upload);
      } catch (e) {
        return res.status(400).json({ errors: ["Este aluno não existe."] });
      }

    });
  }
}

exports. default = new UploadController();
