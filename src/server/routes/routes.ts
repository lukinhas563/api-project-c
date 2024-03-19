import { Router } from 'express';
import { ColaboratorsController, UsersController, HomeController } from '../controllers';

const route = Router();

//HOME
route.get('/', HomeController.get);

// USERS
route.post('/register', UsersController.create);

// COLABORATORS
route.get('/colaborators', ColaboratorsController.getAllValidation, ColaboratorsController.getAll);
route.get(
    '/colaborators/:id',
    ColaboratorsController.getByIdValidation,
    ColaboratorsController.getById,
);
route.post('/colaborators', ColaboratorsController.createValidation, ColaboratorsController.create);
route.put(
    '/colaborators/:id',
    ColaboratorsController.updateByIdValidation,
    ColaboratorsController.updateById,
);
route.delete(
    '/colaborators/:id',
    ColaboratorsController.deleteByIdValidation,
    ColaboratorsController.deleteById,
);

export default route;
