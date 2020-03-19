import { Router } from 'express'; // Router serve para separar as rotas em um arquivo separado
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import WithdrawalController from './app/controllers/WithdrawalController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';
import authAdminMiddleware from './app/middleware/authAdmin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

/** funcionalidades do entregador */
routes.get('/deliveryman/:id/deliveries', WithdrawalController.index);
routes.get('/deliveryman/:id/deliveries', WithdrawalController.find);

routes.put(
  '/deliveryman/:deliverymanId/delivery/:deliveryId',
  WithdrawalController.store
);

/** cancelar entrega com base no problema */
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

/** delivery problems */
routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.find);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

/** funcionalidades do administrador */
routes.use(authAdminMiddleware);
routes.post('/recipients', RecipientController.store);

/** Deliveryman */
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans', DeliverymanController.update);
routes.get('/deliverymans', DeliverymanController.index);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

/** Delivery */
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.list);

export default routes;
