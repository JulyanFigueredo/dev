import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  // metodo init é chamado automaticamente pelo sequlize, espera o objecto de conexao
  // com o banco chamado 'sequelize'
  static init(sequelize) {
    // super chama a classe pai
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'avatar' });
  }
}
export default Deliveryman;
