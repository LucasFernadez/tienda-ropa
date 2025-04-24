import admin from '../config/firebase.js';

/**
 * Muestra el formulario de login usando Firebase client SDK.
 */
export function showLoginForm(req, res) {
  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Panel Admin - Tienda de Ropa</title>
  <link rel="stylesheet" href="/styles.css" />
  <!-- Firebase cliente SDK (compat) -->
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-auth-compat.js"></script>
</head>
<body>
  <div class="login-container">
    <h1>Panel de Administración</h1>
    <form id="login-form" action="/auth/login" method="POST">
      <label for="email">Email:
        <input type="email" id="email" name="email" autocomplete="username" required />
      </label><br />
      <label for="password">Contraseña:
        <input type="password" id="password" name="password" autocomplete="current-password" required />
      </label><br />
      <input type="hidden" id="idToken" name="idToken" />
      <button type="submit">Entrar</button>
    </form>
  </div>

  <!-- Inicialización de Firebase -->
  <script>
   const firebaseConfig = {
      apiKey: "AIzaSyDmAFDk-9abtq1V2dYQpcar1Jt85Ns8oTs",
      authDomain: "tienda-ropa-67a1e.firebaseapp.com",
      projectId: "tienda-ropa-67a1e",
      storageBucket: "tienda-ropa-67a1e.firebasestorage.app",
     messagingSenderId: "292932879175",
     appId: "1:292932879175:web:2a2e26554a896e1f9e0262"
};
    firebase.initializeApp(firebaseConfig);
  </script>

  <!-- Lógica de login -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.getElementById('login-form');
      form.addEventListener('submit', async e => {
        e.preventDefault();
        try {
          const userCred = await firebase.auth().signInWithEmailAndPassword(
            form.email.value,
            form.password.value
          );
          const idToken = await userCred.user.getIdToken();
          form.idToken.value = idToken;
          form.submit();
        } catch (err) {
          console.error('Error Firebase Auth:', err.code, err.message);
          alert('Error al autenticar: ' + err.message);
        }
      });
    });
  </script>
</body>
</html>
`;
  res.send(html);
}

/**
 * Procesa el login en el servidor: verifica el idToken y crea una cookie de sesión.
 */
export async function login(req, res) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).send(' idToken en la petición');

    // Verificar el ID Token con Firebase Admin SDK
    await admin.auth().verifyIdToken(idToken);

    // Crear cookie de sesión válida 5 días
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    // Guardar cookie en todas las rutas
    res.cookie('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/'
    });

    return res.redirect('/products/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return res.status(401).send(
      `<h1>Token inválido o expirado</h1><p>${error.message}</p><a href='/auth/login'>Volver a intentar</a>`
    );
  }
}

/**
 * Cierra la sesión y redirige al login.
 */
export function logout(req, res) {
  res.clearCookie('__session', { path: '/' });
  res.redirect('/auth/login');
}
