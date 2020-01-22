import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class DataBase {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    /** percorrer os models da aplicacao
     * o vetor que contém os models está la em cima
     */
    models
      .map(model => model.init(this.connection))
      /** 'model' representa cada um dos models dentro de 'models'
       * o array é percorrido, dando init em cada model, passando
       * a conexao como parametro
       */
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new DataBase();
