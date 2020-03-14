import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // metodo init é chamado automaticamente pelo sequlize, espera o objecto de conexao
  // com o banco chamado 'sequelize'
  static init(sequelize) {
    // super chama a classe pai
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // dispara hook antes de salvar ou alter usuario no banco
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /** associar o model User com o model File. Salva a referência de de id de arquivo na
   * tabela de usuário na coluna avatarId
   */
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'avatar' });
  }

  // método para checar senha na parte de autenticação(SessionController)
  checkPassword(password) {
    // posso usar this.password_hash pois o metodo tem acesso as informações do usuario que
    // está enviando password
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
