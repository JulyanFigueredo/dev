import Sequelize, { Model } from 'sequelize';

class Enrollment extends Model {
  static init(sequelize) {
    /** init passa 2 parametros,um objeto com as colunas da tabela(fora as chaves e
     * parametros auto incrementáveis) e o sequelize */
    super.init(
      {
        student_id: Sequelize.INTEGER,
        start_date: Sequelize.STRING,
        end_date: Sequelize.DATE,
        plan_id: Sequelize.INTEGER,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );
    /** retorna o mó  dulo que acabou de ser inicializado */
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
