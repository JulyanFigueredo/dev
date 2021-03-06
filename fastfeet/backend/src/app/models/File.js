import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // metodo init é chamado automaticamente pelo sequlize, espera o objecto de conexao
  // com o banco chamado 'sequelize'
  static init(sequelize) {
    // super chama a classe pai
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}
export default File;
