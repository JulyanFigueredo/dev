import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    /** init passa 2 parametros,um objeto com as colunas da tabela(fora as chaves e
     * parametros auto incrementáveis) e o sequelize */
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

    /** código é executado antes de sanvar dado no banco */
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    /** retorna o mó  dulo que acabou de ser inicializado */
    return this;
  }

  checkpassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
