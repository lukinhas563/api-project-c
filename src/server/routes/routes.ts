import { Router } from 'express';
import { home, homePost } from '../controllers/home-controller';

const route = Router();

// HOME
route.get('/', home);
route.post('/:id?', homePost);

export default route;
