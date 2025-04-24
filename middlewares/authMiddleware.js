// middlewares/authMiddleware.js
import admin from '../config/firebase.js';

export const verifyFirebaseAuth = async (req, res, next) => {
  console.log('▶️ Cookies recibidas en dashboard:', req.cookies);
  const token = req.cookies.__session;
  if (!token) {
    console.log('❌ No hay cookie de sesión.');
    return res.redirect('/auth/login');
  }
  try {
    // Esto lanzará si el token es inválido o expirado
    const decoded = await admin.auth().verifySessionCookie(token, true);
    console.log('✅ Sesión válida para UID:', decoded.uid);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Sesión inválida o expirada:', err.message);
    return res.redirect('/auth/login');
  }
};