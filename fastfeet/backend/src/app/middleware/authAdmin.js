import User from '../models/User';

export default async (req, res, next) => {
  const userAdmin = await User.findByPk(req.userId);

  if (userAdmin.email !== 'admin@fastfeet.com') {
    res.status(401).json({ error: 'User is not administrador' });
  }

  return next();
};
