import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const tokenErrorMsg = "Credenciais inválidas.";

    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: [tokenErrorMsg],
      });
    }

    const user = await User.findOne({ where: { email } });
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

    const token = jwt.sign(payload, secret, options);

    res.json({ token });
  }
}

export default new TokenController();
