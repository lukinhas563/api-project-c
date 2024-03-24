import { Router } from 'express';
import {
    CollaboratorsController,
    UsersController,
    HomeController,
    CompaniesControllers,
} from '../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const route = Router();

//HOME
route.get('/', HomeController.get);

// USERS
route.post('/register', UsersController.createUserValidation, UsersController.create);
route.post('/login', UsersController.loginValidation, UsersController.login);

// COLLABORATORS
route.get(
    '/collaborators',
    ensureAuthenticated,
    CollaboratorsController.getAllValidation,
    CollaboratorsController.getAll,
);
route.get(
    '/collaborators/:id',
    ensureAuthenticated,
    CollaboratorsController.getByIdValidation,
    CollaboratorsController.getById,
);
route.post(
    '/collaborators',
    ensureAuthenticated,
    CollaboratorsController.createValidation,
    CollaboratorsController.create,
);
route.put(
    '/collaborators/:id',
    ensureAuthenticated,
    CollaboratorsController.updateByIdValidation,
    CollaboratorsController.updateById,
);
route.delete(
    '/collaborators/:id',
    ensureAuthenticated,
    CollaboratorsController.deleteByIdValidation,
    CollaboratorsController.deleteById,
);

// COMPANIES
route.get(
    '/companies',
    ensureAuthenticated,
    CompaniesControllers.getAllValidation,
    CompaniesControllers.getAll,
);
route.get(
    '/companies/:id',
    ensureAuthenticated,
    CompaniesControllers.getByIdValidation,
    CompaniesControllers.getById,
);
route.post(
    '/companies',
    ensureAuthenticated,
    CompaniesControllers.createValidation,
    CompaniesControllers.create,
);
route.put(
    '/companies/:id',
    ensureAuthenticated,
    CompaniesControllers.updateByIdValidation,
    CompaniesControllers.updateById,
);
route.delete(
    '/companies/:id',
    ensureAuthenticated,
    CompaniesControllers.deleteByIdValidation,
    CompaniesControllers.deleteById,
);

export default route;
