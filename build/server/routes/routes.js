"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../shared/middlewares");
const route = (0, express_1.Router)();
//HOME
route.get('/', controllers_1.HomeController.get);
// USERS
route.post('/register', controllers_1.UsersController.createUserValidation, controllers_1.UsersController.create);
route.post('/login', controllers_1.UsersController.loginValidation, controllers_1.UsersController.login);
// COLLABORATORS
route.get('/collaborators', middlewares_1.ensureAuthenticated, controllers_1.CollaboratorsController.getAllValidation, controllers_1.CollaboratorsController.getAll);
route.get('/collaborators/:id', middlewares_1.ensureAuthenticated, controllers_1.CollaboratorsController.getByIdValidation, controllers_1.CollaboratorsController.getById);
route.post('/collaborators', middlewares_1.ensureAuthenticated, controllers_1.CollaboratorsController.createValidation, controllers_1.CollaboratorsController.create);
route.put('/collaborators/:id', middlewares_1.ensureAuthenticated, controllers_1.CollaboratorsController.updateByIdValidation, controllers_1.CollaboratorsController.updateById);
route.delete('/collaborators/:id', middlewares_1.ensureAuthenticated, controllers_1.CollaboratorsController.deleteByIdValidation, controllers_1.CollaboratorsController.deleteById);
// COMPANIES
route.get('/companies', middlewares_1.ensureAuthenticated, controllers_1.CompaniesControllers.getAllValidation, controllers_1.CompaniesControllers.getAll);
route.get('/companies/:id', middlewares_1.ensureAuthenticated, controllers_1.CompaniesControllers.getByIdValidation, controllers_1.CompaniesControllers.getById);
route.post('/companies', middlewares_1.ensureAuthenticated, controllers_1.CompaniesControllers.createValidation, controllers_1.CompaniesControllers.create);
route.put('/companies/:id', middlewares_1.ensureAuthenticated, controllers_1.CompaniesControllers.updateByIdValidation, controllers_1.CompaniesControllers.updateById);
route.delete('/companies/:id', middlewares_1.ensureAuthenticated, controllers_1.CompaniesControllers.deleteByIdValidation, controllers_1.CompaniesControllers.deleteById);
// SECONDARY ECONOMIC ACTIVITY
route.get('/activity/', middlewares_1.ensureAuthenticated, controllers_1.secondary_economic_activityController.getAllValidation, controllers_1.secondary_economic_activityController.getAll);
route.get('/activity/:id', middlewares_1.ensureAuthenticated, controllers_1.secondary_economic_activityController.getByIdValidation, controllers_1.secondary_economic_activityController.getById);
route.get('/activity/:id', middlewares_1.ensureAuthenticated, controllers_1.secondary_economic_activityController.getByIdValidation, controllers_1.secondary_economic_activityController.getById);
route.post('/activity', middlewares_1.ensureAuthenticated, controllers_1.secondary_economic_activityController.createValidation, controllers_1.secondary_economic_activityController.create);
route.put('/activity/:id', middlewares_1.ensureAuthenticated, controllers_1.secondary_economic_activityController.updateByIdValidation, controllers_1.secondary_economic_activityController.updateById);
route.delete('/activity/:id', middlewares_1.ensureAuthenticated, controllers_1.secondary_economic_activityController.deleteByIdValidation, controllers_1.secondary_economic_activityController.deleteById);
// PARTNERS
route.get('/partners', middlewares_1.ensureAuthenticated, controllers_1.PartnersControllers.getAllValidation, controllers_1.PartnersControllers.getAll);
route.get('/partners/:id', middlewares_1.ensureAuthenticated, controllers_1.PartnersControllers.getByIdValidation, controllers_1.PartnersControllers.getById);
route.post('/partners', middlewares_1.ensureAuthenticated, controllers_1.PartnersControllers.createValidation, controllers_1.PartnersControllers.create);
route.put('/partners/:id', middlewares_1.ensureAuthenticated, controllers_1.PartnersControllers.updateByIdValidation, controllers_1.PartnersControllers.updateById);
route.delete('/partners/:id', middlewares_1.ensureAuthenticated, controllers_1.PartnersControllers.deleteByIdValidation, controllers_1.PartnersControllers.deleteById);
// EMPLOYEES
route.get('/employees', middlewares_1.ensureAuthenticated, controllers_1.EmployeesControllers.getAllValidation, controllers_1.EmployeesControllers.getAll);
route.get('/employees/:id', middlewares_1.ensureAuthenticated, controllers_1.EmployeesControllers.getByIdValidation, controllers_1.EmployeesControllers.getById);
route.post('/employees', middlewares_1.ensureAuthenticated, controllers_1.EmployeesControllers.createValidation, controllers_1.EmployeesControllers.create);
route.put('/employees/:id', middlewares_1.ensureAuthenticated, controllers_1.EmployeesControllers.updateByIdValidation, controllers_1.EmployeesControllers.updateById);
route.delete('/employees/:id', middlewares_1.ensureAuthenticated, controllers_1.EmployeesControllers.deleteByIdValidation, controllers_1.EmployeesControllers.deleteById);
// ADDRESS
route.get('/address', middlewares_1.ensureAuthenticated, controllers_1.AddressController.getAllValidation, controllers_1.AddressController.getAll);
route.get('/address/:id', middlewares_1.ensureAuthenticated, controllers_1.AddressController.getByIdValidation, controllers_1.AddressController.getById);
route.post('/address', middlewares_1.ensureAuthenticated, controllers_1.AddressController.createValidation, controllers_1.AddressController.create);
route.put('/address/:id', middlewares_1.ensureAuthenticated, controllers_1.AddressController.updateByIdValidation, controllers_1.AddressController.updateById);
route.delete('/address/:id', middlewares_1.ensureAuthenticated, controllers_1.AddressController.deleteByIdValidation, controllers_1.AddressController.deleteById);
// TASKS
route.get('/tasks', middlewares_1.ensureAuthenticated, controllers_1.TasksController.getAllValidation, controllers_1.TasksController.getAll);
route.get('/tasks/:id', middlewares_1.ensureAuthenticated, controllers_1.TasksController.getByIdValidation, controllers_1.TasksController.getById);
route.post('/tasks', middlewares_1.ensureAuthenticated, controllers_1.TasksController.createValidation, controllers_1.TasksController.create);
route.put('/tasks/:id', middlewares_1.ensureAuthenticated, controllers_1.TasksController.updateByIdValidation, controllers_1.TasksController.updateById);
route.delete('/tasks/:id', middlewares_1.ensureAuthenticated, controllers_1.TasksController.deleteByIdValidation, controllers_1.TasksController.deleteById);
// REGISTRATIONS
route.get('/registrations', middlewares_1.ensureAuthenticated, controllers_1.RegistrationsController.getAllValidation, controllers_1.RegistrationsController.getAll);
route.get('/registrations/:id', middlewares_1.ensureAuthenticated, controllers_1.RegistrationsController.getByIdValidation, controllers_1.RegistrationsController.getById);
route.post('/registrations', middlewares_1.ensureAuthenticated, controllers_1.RegistrationsController.createValidation, controllers_1.RegistrationsController.create);
route.put('/registrations/:id', middlewares_1.ensureAuthenticated, controllers_1.RegistrationsController.updateByIdValidation, controllers_1.RegistrationsController.updateById);
route.delete('/registrations/:id', middlewares_1.ensureAuthenticated, controllers_1.RegistrationsController.deleteByIdValidation, controllers_1.RegistrationsController.deleteById);
exports.default = route;
