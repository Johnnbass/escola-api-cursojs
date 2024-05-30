import Aluno from "../models/Aluno";
import Upload from "../models/Upload";

class AlunoController {
  async index(req, res) {
    const students = await Aluno.findAll({
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
        [Upload, "id", "DESC"],
      ],
      include: {
        model: Upload,
        attributes: ["url", "originalname", "filename"],
      },
    });

    res.json({ data: students });
  }

  async store(req, res) {
    try {
      const student = await Aluno.create(req.body);
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

      const student = await Aluno.findByPk(id, {
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
          [Upload, "id", "DESC"],
        ],
        include: {
          model: Upload,
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

      const student = await Aluno.findByPk(req.params.id);
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

      const student = await Aluno.findByPk(req.params.id);
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

export default new AlunoController();
