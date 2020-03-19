import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */
import { Op } from 'sequelize';
import { parseISO, subDays, endOfDay, startOfDay } from 'date-fns';
import Delivery from '../models/Delivery';

class WithDrawalController {
  async index(req, res) {
    const { done } = req.query;
    /** listar só as completadas? 0=não/1=sim */
    if (done === '0') {
      const deliveries = await Delivery.findAll({
        where: {
          deliverymanId: req.params.id,
          endDate: null,
          canceledAt: null,
        },
      });
      return res.json(deliveries);
    }
    const deliveries = await Delivery.findAll({
      where: {
        deliverymanId: req.params.id,
        endDate: { [Op.not]: null },
        canceledAt: { [Op.not]: null },
      },
    });

    return res.json(deliveries);
  }

  async find(req, res) {
    const deliveries = await Delivery.findAll({
      where: { deliverymanId: req.params.id },
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      startDate: Yup.date(),
      endDate: Yup.date(),
      signatureId: Yup.number()
        .integer()
        .when('endDate', (endDate, field) =>
          endDate ? field.required() : field
        ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    /** Você deve permitir que o entregador tenha rotas para incluir uma data de retirada
     *  (start_date) e data de entrega (end_date) para as encomendas.
     * */
    const { startDate, endDate, signatureId } = req.body;
    const hour = parseISO(startDate).getHours();
    if (hour < 8 && hour > 18) {
      return res
        .status(400)
        .json({ message: 'Delivery start date must be between 8h to 18h' });
    }
    /** O entregador só pode fazer 5 retiradas por dia. Se ele está tentando colocar
     * uma data de início, fazer a verificação
     */
    const { deliverymanId, deliveryId } = req.params;
    const startDay = startOfDay(new Date());

    const delivery = await Delivery.findByPk(deliveryId);

    if (startDate && !endDate) {
      const deliveries = await Delivery.findAll({
        where: {
          startDate: {
            [Op.gt]: startDay,
          },
          deliverymanId,
        },
      });
      if (deliveries.length > 4) {
        return res
          .status(401)
          .json({ message: 'Delivery man reached 5 deliveries in 24h' });
      }
      delivery.update({ startDate });
      return res.json(delivery);
    }
    /** se há o campo endDate, o startDate é ignorado, só atualiza o endDate */
    delivery.update({ endDate, signatureId });

    return res.json(delivery);
  }
}

export default new WithDrawalController();
