import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  /** cadastro de usuario */
  async store(req, res) {
    /** verificacao de dados de entrada */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /** verificacao se usuário existe */
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }
    /** criar usuario com base nos dados do body da requisicao */
    const { id, name, email, provider } = await User.create(req.body);

    /** retorna algo ao usuario final */
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  /** esta rota não deve ser acessível a usuários não logados */
  async update(req, res) {
    /** verificacao de dados de entrada */
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      /** se password foi preenchido, compara confirmpasswrod com password */
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });

      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkpassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
