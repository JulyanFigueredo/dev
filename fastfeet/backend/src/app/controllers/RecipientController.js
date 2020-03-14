import * as Yup from 'yup'; /** biblioteca de validação de entrada de dados */

import Recipient from '../models/Recipient';

class RecipientController {
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

    const recipientExists = await Recipient.findOne(req.body);

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

  // async update(req, res) {
  //   /** validação de dados. Yup usa schema validation. Valida objecto pois req.body é objeto */
  //   const schema = Yup.object().shape({
  //     name: Yup.string(),
  //     street: Yup.string(),
  //     number: Yup.string(),
  //     complement: Yup.string(),
  //     state: Yup.string(),
  //     city: Yup.string(),
  //     cep: Yup.string(),
  //   });

  //   if (!(await schema.isValid(req.body))) {
  //     return res.status(400).json({ message: 'Validation fails' });
  //   }
  //   /** fim validação */

  //   const { email, oldPassword } = req.body;

  //   const user = await User.findByPk(req.userId);

  //   /** só tenta alterar email se tiver informado email na req */
  //   if (email && email !== user.email) {
  //     const userExists = await User.findOne({ where: { email } });

  //     if (userExists) {
  //       return res.status(400).json({ error: 'User already exists' });
  //     }
  //   }

  //   /** só tenta alterar password se tiver informado oldpassword na req */
  //   if (oldPassword && !(await user.checkPassword(oldPassword))) {
  //     return res.status(401).json({ error: 'Password does not match' });
  //   }

  //   /** atualiza os campos com mesmo nome enviados pelo body  */
  //   const { id, name, provider } = await user.update(req.body);

  //   return res.json({
  //     id,
  //     name,
  //     email,
  //     provider,
  //   });
  // }
}

export default new RecipientController();
