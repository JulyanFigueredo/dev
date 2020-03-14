import { Router } from 'express'; // Router serve para separar as rotas em um arquivo separado
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';
import authAdminMiddleware from './app/middleware/authAdmin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

// routes.use(authAdminMiddleware);
routes.post('/recipients', authAdminMiddleware, RecipientController.store);

export default routes;
