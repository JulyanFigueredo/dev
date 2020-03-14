import jwt from 'jsonwebtoken';
import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */
import User from '../models/User';
import authConfig from '../../config/auth';

// esse controle para autenticacao de usuário cadastrados no banco
class SessionController {
  async store(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // bcrypt.compare, usado no model user, é assincrono
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.experiesIn,
      }),
      // método sign gera o token, recebe como parametro informações de payload, chave do md5=123
    });
  }
}

export default new SessionController();
