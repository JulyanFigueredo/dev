import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */

import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import Mail from '../../lib/Mail';

class DeliveryController {
  async store(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipientId: Yup.number()
        .integer()
        .required(),
      deliverymanId: Yup.number()
        .integer()
        .required(),
      signatureId: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const hour = new Date().getHours();
    if (hour < 8 || hour > 23) {
      return res
        .status(400)
        .json({ message: 'Delivery start date must be between 8h to 18h' });
    }
    /** fim validação */

    const {
      id,
      product,
      recipientId,
      deliverymanId,
      signatureId,
    } = await Delivery.create(req.body);

    /** Quando a encomenda é cadastrada para um entregador, o entregador recebe um e-mail
     * com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto
     * já está disponível para a retirada */
    const deliveryman = await Deliveryman.findByPk(req.body.deliverymanId);
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Delivery Registered',
      text: `New delivery\nProduct name: ${product}`,
    });

    return res.json({
      id,
      product,
      recipientId,
      deliverymanId,
      signatureId,
    });
  }

  async update(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      product: Yup.string(),
      recipientId: Yup.number().integer(),
      deliverymanId: Yup.number().integer(),
      signatureId: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    const delivery = await Delivery.findByPk(req.params.id);

    delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    const { product, recipientId, deliverymanId, signatureId } = delivery;
    delivery.destroy();

    return res.json({
      product,
      recipientId,
      deliverymanId,
      signatureId,
    });
  }

  async index(req, res) {
    const delivery = await Delivery.findAll();
    return res.json(delivery);
  }

  async list(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    return res.json(delivery);
  }
}

export default new DeliveryController();
