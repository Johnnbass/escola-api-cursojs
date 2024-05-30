import User from "../models/User";

class UserController {
  async index(req, res) {
    const errorMsg = "Não foi possível carregar os usuários.";

    try {
      const users = await User.findAll({ attributes: ["id", "nome", "email"] });
      if (!users) return res.status(404).json({ errors: [errorMsg] });
      
      return res.json({ data: users });
    } catch (e) {
      return res.status(400).json({ errors: [errorMsg] });
    }
  }

  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email } = newUser;

      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user)
        return res
          .status(404)
          .json({ errors: ["O usuário não foi encontrado."] });

      const { id, nome, email } = user;
      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: ["Não foi possível carregar o usuário."] });
    }
  }

  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({ errors: ["O [id] não foi informado."] });
      }

      const user = await User.findByPk(req.userId);
      if (!user)
        return res
          .status(404)
          .json({ errors: ["O usuário não foi encontrado."] });

      const data = await user.update(req.body);

      const { id, nome, email } = data;
      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId)
        return res.status(400).json({ errors: ["O [id] não foi informado."] });

      const user = await User.findByPk(req.userId);
      if (!user)
        return res
          .status(404)
          .json({ errors: ["O usuário não foi encontrado."] });

      await user.destroy();

      const { id, nome, email } = user;
      return res.json({ data: { id, nome, email } });
    } catch (e) {
      return res
        .status(404)
        .json({ errors: ["Não foi possível excluir o usuário."] });
    }
  }
}

export default new UserController();
