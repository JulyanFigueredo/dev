import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  // metodo init é chamado automaticamente pelo sequlize, espera o objecto de conexao
  // com o banco chamado 'sequelize'
  static init(sequelize) {
    // super chama a classe pai
    super.init(
      {
        description: Sequelize.STRING,
        deliveryId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'deliveryId',
      as: 'delivery',
    });
  }
}

export default DeliveryProblem;
