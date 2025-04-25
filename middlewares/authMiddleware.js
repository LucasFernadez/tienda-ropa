// middlewares/authMiddleware.js
import admin from '../config/firebase.js';

export const verifyFirebaseAuth = async (req, res, next) => {
  const token = req.cookies.__session;
  if (!token) {
    return res.redirect('/auth/login');
  }
  try {
    // Verificamos el ID Token (aud = projectId)
    await admin.auth().verifyIdToken(token);
    next();
  } catch (err) {
    console.log('Token inválido o expirado:', err.code);
    return res.redirect('/auth/login');
  }
};