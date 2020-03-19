import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  // metodo init é chamado automaticamente pelo sequlize, espera o objecto de conexao
  // com o banco chamado 'sequelize'
  static init(sequelize) {
    // super chama a classe pai
    super.init(
      {
        product: Sequelize.STRING,
        recipientId: Sequelize.INTEGER,
        deliverymanId: Sequelize.INTEGER,
        signatureId: Sequelize.INTEGER,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        canceledAt: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'signatureId',
      as: 'signature',
    });
    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliverymanId',
      as: 'deliveryman',
    });
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipientId',
      as: 'recipient',
    });
  }
}
export default Delivery;
