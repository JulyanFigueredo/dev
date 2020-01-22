import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.id = decoded.id;
    const user = await User.findByPk(req.id);

    if (user.name !== 'Administrador') {
      return res
        .status(401)
        .json({ error: 'User in current session is not admin' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ error: `Token invalid: ${err.stack}` });
  }
};
