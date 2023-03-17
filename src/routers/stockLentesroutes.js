import { Router } from 'express';
import StockLentesController from '../controllers/StockLentesController';
// import loginRequiredAdmin from '../middlewares/loginRequiredAdmin';

const router = new Router();

router.get('/lentes/', StockLentesController.index);
router.get('/lentes/:id', StockLentesController.show);

router.put('/lentes/:id', StockLentesController.update);
router.post('/lentes', StockLentesController.store);
router.delete('/lentes/:id', StockLentesController.delete);

export default router;
