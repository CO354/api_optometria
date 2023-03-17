import { Router } from 'express';
import StockArosController from '../controllers/StockArosController';
// import loginRequiredAdmin from '../middlewares/loginRequiredAdmin';

const router = new Router();

router.get('/aros/', StockArosController.index);
router.get('/aros/:id', StockArosController.show);

router.put('/aros/:id', StockArosController.update);
router.post('/aros', StockArosController.store);
router.delete('/aros/:id', StockArosController.delete);

export default router;
