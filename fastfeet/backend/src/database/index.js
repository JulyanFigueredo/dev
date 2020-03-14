import Sequelize from 'sequelize';
import User from '../app/models/User';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import databaseConfig from '../config/database';

const models = [User, File, Recipient];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection)); // passa o objeto conexao para cada model
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new DataBase();
