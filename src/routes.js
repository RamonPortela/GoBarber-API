import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppoitmentController from './app/controllers/AppoitmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

routes.post('/sessions', SessionController.store);

routes.get('/providers', authMiddleware, ProviderController.index);

routes.get('/appointments', authMiddleware, AppoitmentController.index);
routes.post('/appointments', authMiddleware, AppoitmentController.store);

routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);
export default routes;
