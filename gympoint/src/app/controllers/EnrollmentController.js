import * as Yup from 'yup';
import { parseISO, addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';
import Student from '../models/Student';

class EnrollmentController {
  /** cadastro de usuario */
  async store(req, res) {
    /** verificacao de dados de entrada */
    const schema = Yup.object().shape({
      student_id: Yup.number().integer(),
      start_date: Yup.date().required(),
      plan_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.findByPk(req.body.plan_id);
    const end_date = addMonths(parseISO(req.body.start_date), plan.duration); // somar data com duracao em meses
    const price_total = plan.duration * plan.price;

    /** criar matrícula com base nos dados do body da requisicao */
    // const price = plan.
    const enrollment = await Enrollment.create({
      student_id: req.body.student_id,
      start_date: req.body.start_date,
      end_date,
      plan_id: req.body.plan_id,
      price: price_total,
    });

    const student = await Student.findByPk(req.body.student_id);

    try {
      await Mail.sendMail({
        to: 'julyan.figueredo@gmail.com',
        subject: 'Matrícula Gympoint',
        template: 'creation_enrollment',
        context: {
          provider: student.name,
          user: student.name,
          date: enrollment.start_date,
          plano: plan.title,
          price: enrollment.price,
        },
      });
    } catch (error) {
      return res.json(error);
    }

    /** retorna algo ao usuario final */
    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll();
    return res.json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      enrollment_id: Yup.number().integer(),
      plan_id: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { enrollment_id, plan_id } = req.body;

    const EnrollmentExist = await Enrollment.findByPk(enrollment_id, {
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    // if (EnrollmentExist) {
    //   const { title, price, duration } = await EnrollmentExist.update({

    //   });
    // }

    return res.json(EnrollmentExist);
  }
}

export default new EnrollmentController();
