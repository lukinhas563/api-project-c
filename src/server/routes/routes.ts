import { Router } from 'express';
import { ColaboratorsController, UsersController, HomeController } from '../controllers';

const route = Router();

//HOME
route.get('/', HomeController.get);

// USERS
route.post('/register', UsersController.create);

// COLABORATORS
route.post(
    '/colaborators/:filter?',
    ColaboratorsController.createValidation,
    ColaboratorsController.create,
);

export default route;
