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
import { verifyFirebaseAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- RUTAS ADMIN (estáticas y con verbos específicos) ---
router.get('/dashboard', verifyFirebaseAuth, showProducts);
router.get('/dashboard/new', verifyFirebaseAuth, showNewProduct);
router.post('/dashboard', verifyFirebaseAuth, createProduct);
router.get('/dashboard/:productId/edit', verifyFirebaseAuth, showEditProduct);
router.put('/dashboard/:productId', verifyFirebaseAuth, updateProduct);
router.delete('/dashboard/:productId/delete', verifyFirebaseAuth, deleteProduct);
router.get('/dashboard/:productId', verifyFirebaseAuth, showProductById);

// --- RUTAS PÚBLICAS ---
router.get('/', showProducts);
router.get('/:productId', showProductById);

export default router;