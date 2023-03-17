import { Router } from 'express';
import VendasStockArosController from '../controllers/VendasStockArosController';
// import loginRequiredAdmin from '../middlewares/loginRequiredAdmin';

const router = new Router();

router.get('/aros/', VendasStockArosController.index);
router.get('/aros/:id', VendasStockArosController.show);

router.put('/aros/:id', VendasStockArosController.update);
router.post('/aros', VendasStockArosController.store);
router.delete('/aros/:id', VendasStockArosController.delete);

export default router;
