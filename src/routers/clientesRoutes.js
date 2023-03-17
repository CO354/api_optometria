import { Router } from 'express';
import ClientesController from '../controllers/ClientesController';
// import loginRequiredAdmin from '../middlewares/loginRequiredAdmin';

const router = new Router();

router.get('/', ClientesController.index);
router.get('/:id', ClientesController.show);

router.put('/:id', ClientesController.update);
router.post('/', ClientesController.store);
router.delete('/:id', ClientesController.delete);

export default router;
