import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    /** verificacao de dados de entrada */
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /** verificacao se usuário existe */
    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExist) {
      return res.status(400).json({ error: 'student already exists' });
    }

    const { email, name, idade, peso, altura } = await Student.create(req.body);

    return res.json({
      student: {
        email,
        name,
        idade,
        peso,
        altura,
      },
    });
  }
}

export default new StudentController();
