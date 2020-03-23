import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q } = req.query;
    if (q) {
      const recipient = await Recipient.findAll({
        where: {
          name: {
            [Op.iLike]: `${q}%`,
          },
        },
      });
      return res.json(recipient);
    }

    const recipient = await Recipient.findAll();
    return res.json(recipient);
  }

  async store(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        state: req.body.state,
        city: req.body.city,
        cep: req.body.cep,
      },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already registered' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);
    return res.json({ id, name, street, number, complement, state, city, cep });
  }

  async update(req, res) {
    /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }
    /** fim validação */

    const recipient = await Recipient.findByPk(req.params.id);

    recipient.update(req.body);
    return res.json(recipient);
  }
}

export default new RecipientController();
