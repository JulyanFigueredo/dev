import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */
import DeliveryProblem from '../models/DeliveryProblem';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

import Mail from '../../lib/Mail';

class DeliveryProblemController {
  async index(req, res) {
    const deliveryProblem = await DeliveryProblem.findAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'deliverymanId',
            'signatureId',
            'recipientId',
            'startDate',
            'endDate',
            'canceledAt',
          ],
        },
      ],
    });

    return res.json(deliveryProblem);
  }

  async find(req, res) {
    const deliveryId = parseInt(req.params.id);
    const deliveryProblem = await DeliveryProblem.findAll({
      where: {
        deliveryId,
      },
      attributes: ['id', 'description'],
    });

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const { description } = req.body;
    const deliveryId = parseInt(req.params.id);
    const problem = await DeliveryProblem.create({
      deliveryId,
      description,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const problemId = req.params.id;
    const problem = await DeliveryProblem.findOne({
      where: {
        id: problemId,
      },
      include: [
        {
          model: Delivery,
          as: 'delivery',
        },
      ],
    });
    problem.delivery.canceledAt = new Date();
    problem.delivery.save();
    /**
     * Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o
     *  sobre o cancelamento.
     */
    const deliveryman = await Deliveryman.findByPk(
      problem.delivery.deliverymanId
    );
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Delivery Canceled',
      text: `One delivery was canceled\nDelivery ID: ${problem.delivery.id}\nProduct name: ${problem.delivery.product}`,
    });
    return res.json(problem);
  }
}

export default new DeliveryProblemController();
