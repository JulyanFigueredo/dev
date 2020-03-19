import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */
import { Op } from 'sequelize';

import { parseISO, subDays } from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliverymanController {
  async store(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    const DeliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email, name: req.body.name },
    });

    if (DeliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already registered' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);
    return res.json({ id, name, email });
  }

  async update(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      oldName: Yup.string(),
      oldEmail: Yup.string().email(),
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    const { oldName, oldEmail, name, email } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: {
        email: oldEmail,
        name: oldName,
      },
    });

    /** só tenta alterar email se tiver informado email na req */
    if (email && email !== deliveryman.oldEmail) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email, name },
      });

      if (deliverymanExists) {
        return res
          .status(400)
          .json({ error: 'Deliveryman already registered' });
      }
    }

    /** atualiza os campos com mesmo nome enviados pelo body  */
    const { id, avatarId } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatarId,
    });
  }

  async index(req, res) {
    const deliveryman = await Deliveryman.findAll();
    if (deliveryman.length < 1) {
      res.status(401).json({ message: 'No deliverymen registered' });
    }
    return res.json(deliveryman);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    if (!deliveryman) {
      res.status(401).json({ message: 'Deliveryman is not registered' });
    }
    const { id, name, email } = deliveryman;
    deliveryman.destroy();
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new DeliverymanController();
