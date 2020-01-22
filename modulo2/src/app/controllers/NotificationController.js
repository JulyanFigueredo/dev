import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificaitonController {
  async index(req, res) {
    const checkidProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkidProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notification' });
    }

    /** consulta no banco mongo */
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    // const notification = await Notification.findById(req.params.id);

    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificaitonController();
