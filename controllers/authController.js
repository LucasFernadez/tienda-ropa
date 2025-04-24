import admin from '../config/firebase.js';

// Mostrar form de login
export const showLoginForm = (req, res) => {
  const html = `
    <h1>Iniciar Sesión</h1>
    <form action="/auth/login" method="POST">
      <label for="idToken">ID Token de Firebase</label>
      <input type="text" id="idToken" name="idToken" required>
      <button type="submit">Entrar</button>
    </form>
  `;
  res.send(html);
};

// Procesar login
export const login = async (req, res) => {
  try {
    const { idToken } = req.body;
    // Verificar token emitido por el cliente
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Crear sesión (cookie segura)
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 
    const sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });

    
    res.cookie('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    res.redirect('/products/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).send('<p>Token inválido o expirado</p><a href="/auth/login">Intentar de nuevo</a>');
  }
};

// Logout: borrar cookie y redirigir
export const logout = (req, res) => {
  res.clearCookie('__session');
  res.redirect('/auth/login');
};