import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';
import authAdminMiddleware from './app/middlewares/authAdmin';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
/** esse middleware só vale para as rota que vem abaixo */
routes.put('/users', UserController.update);

routes.use(authAdminMiddleware);
routes.post('/students', StudentController.store);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments', EnrollmentController.update);
// routes.delete('/enrollments', EnrollmentController.delete);

export default routes;
