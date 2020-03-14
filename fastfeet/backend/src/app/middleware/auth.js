import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // eliminar a palavra 'bearer' do header

  /**
   * jwt.verify é método assíncrono que usa padrão callback. Para mudar para o padrão de
   * async/await é necessário usar promisify por fora da função, para que retorne uma
   * função async/await
   */
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    /**
     * cria uma variável userId para ser usada depois da autenticação, portanto não é
     * necessário passar o id do usuário que se quer atualizar, por exemplo
     */
    req.userId = decoded.id;

    return next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
