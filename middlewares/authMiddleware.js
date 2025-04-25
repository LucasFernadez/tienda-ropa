// middlewares/authMiddleware.js
import admin from '../config/firebase.js';

export const verifyFirebaseAuth = async (req, res, next) => {
  const token = req.cookies.__session;
  if (!token) {
    return res.redirect('/auth/login');
  }
  try {
    // Esto lanzará si el token es inválido o expirado
    const decoded = await admin.auth().verifySessionCookie(token, true);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/auth/login');
  }
};