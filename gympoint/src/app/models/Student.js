import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.FLOAT,
        altura: Sequelize.FLOAT,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    /** retorna o mó  dulo que acabou de ser inicializado */
    return this;
  }
}

export default Student;
