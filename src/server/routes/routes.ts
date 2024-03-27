import { Router } from 'express';
import {
    CollaboratorsController,
    UsersController,
    HomeController,
    CompaniesControllers,
    secondary_economic_activityController,
    PartnersControllers,
    EmployeesControllers,
    AddressController,
    TasksController,
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

// SECONDARY ECONOMIC ACTIVITY
route.get(
    '/activity/',
    ensureAuthenticated,
    secondary_economic_activityController.getAllValidation,
    secondary_economic_activityController.getAll,
);
route.get(
    '/activity/:id',
    ensureAuthenticated,
    secondary_economic_activityController.getByIdValidation,
    secondary_economic_activityController.getById,
);
route.get(
    '/activity/:id',
    ensureAuthenticated,
    secondary_economic_activityController.getByIdValidation,
    secondary_economic_activityController.getById,
);
route.post(
    '/activity',
    ensureAuthenticated,
    secondary_economic_activityController.createValidation,
    secondary_economic_activityController.create,
);
route.put(
    '/activity/:id',
    ensureAuthenticated,
    secondary_economic_activityController.updateByIdValidation,
    secondary_economic_activityController.updateById,
);
route.delete(
    '/activity/:id',
    ensureAuthenticated,
    secondary_economic_activityController.deleteByIdValidation,
    secondary_economic_activityController.deleteById,
);

// PARTNERS
route.get(
    '/partners',
    ensureAuthenticated,
    PartnersControllers.getAllValidation,
    PartnersControllers.getAll,
);
route.get(
    '/partners/:id',
    ensureAuthenticated,
    PartnersControllers.getByIdValidation,
    PartnersControllers.getById,
);
route.post(
    '/partners',
    ensureAuthenticated,
    PartnersControllers.createValidation,
    PartnersControllers.create,
);
route.put(
    '/partners/:id',
    ensureAuthenticated,
    PartnersControllers.updateByIdValidation,
    PartnersControllers.updateById,
);
route.delete(
    '/partners/:id',
    ensureAuthenticated,
    PartnersControllers.deleteByIdValidation,
    PartnersControllers.deleteById,
);

// EMPLOYEES
route.get(
    '/employees',
    ensureAuthenticated,
    EmployeesControllers.getAllValidation,
    EmployeesControllers.getAll,
);
route.get(
    '/employees/:id',
    ensureAuthenticated,
    EmployeesControllers.getByIdValidation,
    EmployeesControllers.getById,
);
route.post(
    '/employees',
    ensureAuthenticated,
    EmployeesControllers.createValidation,
    EmployeesControllers.create,
);
route.put(
    '/employees/:id',
    ensureAuthenticated,
    EmployeesControllers.updateByIdValidation,
    EmployeesControllers.updateById,
);
route.delete(
    '/employees/:id',
    ensureAuthenticated,
    EmployeesControllers.deleteByIdValidation,
    EmployeesControllers.deleteById,
);

// ADDRESS
route.get(
    '/address',
    ensureAuthenticated,
    AddressController.getAllValidation,
    AddressController.getAll,
);
route.get(
    '/address/:id',
    ensureAuthenticated,
    AddressController.getByIdValidation,
    AddressController.getById,
);
route.post(
    '/address',
    ensureAuthenticated,
    AddressController.createValidation,
    AddressController.create,
);
route.put(
    '/address/:id',
    ensureAuthenticated,
    AddressController.updateByIdValidation,
    AddressController.updateById,
);
route.delete(
    '/address/:id',
    ensureAuthenticated,
    AddressController.deleteByIdValidation,
    AddressController.deleteById,
);

// TASKS
route.get('/tasks', ensureAuthenticated, TasksController.getAllValidation, TasksController.getAll);
route.get(
    '/tasks/:id',
    ensureAuthenticated,
    TasksController.getByIdValidation,
    TasksController.getById,
);
route.post('/tasks', ensureAuthenticated, TasksController.createValidation, TasksController.create);
route.put(
    '/tasks/:id',
    ensureAuthenticated,
    TasksController.updateByIdValidation,
    TasksController.updateById,
);
route.delete(
    '/tasks/:id',
    ensureAuthenticated,
    TasksController.deleteByIdValidation,
    TasksController.deleteById,
);

export default route;
