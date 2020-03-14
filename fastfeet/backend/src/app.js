import express from 'express';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();

    // os dois metodos são uma única vez aqui
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // para que o servidor aceite json no corpo das requisições
  }

  routes() {
    this.server.use(routes); // todas são middlewares
  }
}

export default new App().server;
