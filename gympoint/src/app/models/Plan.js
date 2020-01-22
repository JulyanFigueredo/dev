import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    /** init passa 2 parametros,um objeto com as colunas da tabela(fora as chaves e
     * parametros auto incrementáveis) e o sequelize */
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        created_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    /** retorna o mó  dulo que acabou de ser inicializado */
    return this;
  }
}

export default Plan;
