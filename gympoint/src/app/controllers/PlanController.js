import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /** verificacao se planio existe */
    const planExist = await Plan.findOne({ where: { title: req.body.title } });
    if (planExist) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      price: Yup.number(),
      duration: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { title, price, duration } = req.body;

    const planExist = await Plan.findByPk(req.params.id);

    if (planExist) {
      const { title, price, duration } = await planExist.update(req.body);
    }

    return res.json({ title, price, duration });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    const plan2 = plan.destroy();
    return res.json(plan2);
  }
}

export default new PlanController();
