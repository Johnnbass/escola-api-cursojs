"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Upload = require('../models/Upload'); var _Upload2 = _interopRequireDefault(_Upload);

class AlunoController {
  async index(req, res) {
    const students = await _Aluno2.default.findAll({
      attributes: [
        "id",
        "nome",
        "sobrenome",
        "email",
        "idade",
        "peso",
        "altura",
      ],
      order: [
        ["id", "DESC"],
        [_Upload2.default, "id", "DESC"],
      ],
      include: {
        model: _Upload2.default,
        attributes: ["url", "originalname", "filename"],
      },
    });

    res.json({ data: students });
  }

  async store(req, res) {
    try {
      const student = await _Aluno2.default.create(req.body);
      const { id, nome, email } = student;

      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({ errors: ["O [id] não foi informado."] });

      const student = await _Aluno2.default.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "sobrenome",
          "email",
          "idade",
          "peso",
          "altura",
        ],
        order: [
          ["id", "DESC"],
          [_Upload2.default, "id", "DESC"],
        ],
        include: {
          model: _Upload2.default,
          attributes: ["url", "originalname", "filename"],
        },
      });

      if (!student)
        return res
          .status(404)
          .json({ errors: ["O aluno não foi encontrado."] });

      return res.json({ data: student });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id)
        return res.status(400).json({ errors: ["O [id] não foi informado."] });

      const student = await _Aluno2.default.findByPk(req.params.id);
      if (!student)
        return res
          .status(404)
          .json({ errors: ["O aluno não foi encontrado."] });

      const updatedStudent = await student.update(req.body);

      const { id, nome, email } = updatedStudent;
      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id)
        return res.status(400).json({ errors: ["O [id] não foi informado."] });

      const student = await _Aluno2.default.findByPk(req.params.id);
      if (!student)
        return res
          .status(404)
          .json({ errors: ["O aluno não foi encontrado."] });

      await student.destroy();

      const { id, nome, email } = student;
      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

exports. default = new AlunoController();
