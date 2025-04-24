import express from 'express';
import {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Vista pública
router.get('/', showProducts);
router.get('/:productId', showProductById);

// Dashboard admin
router.get('/dashboard', showProducts);
router.get('/dashboard/new', showNewProduct);
router.post('/dashboard', createProduct);
router.get('/dashboard/:productId', showProductById);
router.get('/dashboard/:productId/edit', showEditProduct);
router.post('/dashboard/:productId/edit', updateProduct);
router.post('/dashboard/:productId/delete', deleteProduct);

export default router;