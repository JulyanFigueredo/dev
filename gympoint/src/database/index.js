import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import databaseConfig from '../config/database';
import Enrollment from '../app/models/Enrollment';

const models = [User, Student, Plan, Enrollment];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    /** percorrer os models da aplicacao
     * o vetor que contém os models está la em cima
     */
    models.map(model => model.init(this.connection));
    /** 'model' representa cada um dos models dentro de 'models'
     * o array é percorrido, dando init em cada model, passando
     * a conexao como parametro
     */
  }
}

export default new DataBase();
