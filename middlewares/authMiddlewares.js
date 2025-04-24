import admin from '../config/firebase.js';

export const verifyFirebaseAuth = async (req, res, next) => {
  try {
    // Obtenemos el token desde Authorization header o cookie
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.__session;

    if (!token) {
      return res.redirect('/auth/login');
    }

    // Verificamos el token con Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error('Error en authMiddleware:', error);
    return res.redirect('/auth/login');
  }
};