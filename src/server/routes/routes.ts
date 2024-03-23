import { Router } from 'express';
import { ColaboratorsController, UsersController, HomeController } from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const route = Router();

//HOME
route.get('/', HomeController.get);

// USERS
route.post('/register', UsersController.createUserValidation, UsersController.create);
route.post('/login', UsersController.loginValidation, UsersController.login);

// COLABORATORS
route.get(
    '/colaborators',
    ensureAuthenticated,
    ColaboratorsController.getAllValidation,
    ColaboratorsController.getAll,
);
route.get(
    '/colaborators/:id',
    ensureAuthenticated,
    ColaboratorsController.getByIdValidation,
    ColaboratorsController.getById,
);
route.post(
    '/colaborators',
    ensureAuthenticated,
    ColaboratorsController.createValidation,
    ColaboratorsController.create,
);
route.put(
    '/colaborators/:id',
    ensureAuthenticated,
    ColaboratorsController.updateByIdValidation,
    ColaboratorsController.updateById,
);
route.delete(
    '/colaborators/:id',
    ensureAuthenticated,
    ColaboratorsController.deleteByIdValidation,
    ColaboratorsController.deleteById,
);

export default route;
