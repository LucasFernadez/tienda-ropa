import express from 'express';
import { showLoginForm, login, logout } from '../controllers/authController.js';
import { verifyFirebaseAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Formulario de login
router.get('/login', showLoginForm);

// Procesar inicio de sesión
router.post('/login', login);

// Cerrar sesión (protegido)
router.post('/logout', verifyFirebaseAuth, logout);

export default router;