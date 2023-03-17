import { Router } from 'express';
import VendasStockLentesController from '../controllers/VendasStockLentesController';
// import loginRequiredAdmin from '../middlewares/loginRequiredAdmin';

const router = new Router();

router.get('/lentes/', VendasStockLentesController.index);
router.get('/lentes/:id', VendasStockLentesController.show);

router.put('/lentes/:id', VendasStockLentesController.update);
router.post('/lentes', VendasStockLentesController.store);
router.delete('/lentes/:id', VendasStockLentesController.delete);

export default router;
