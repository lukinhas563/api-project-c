import { Router } from 'express';
import { ColaboratorsController, UsersController, HomeController } from '../controllers';

const route = Router();

//HOME
route.get('/', HomeController.get);

// USERS
route.post('/register', UsersController.create);

// COLABORATORS
route.get('/colaborators', ColaboratorsController.getAllValidation, ColaboratorsController.getAll);
route.post('/colaborators', ColaboratorsController.createValidation, ColaboratorsController.create);

export default route;
