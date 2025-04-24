import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
// import authRoutes from './routes/authRoutes.js'; // BONUS Firebase
import methodOverride from 'method-override';

// Carga variables de entorno
dotenv.config();

// Conecta a MongoDB
connectDB();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));    // Para procesar formularios
app.use(express.json());                              // Para procesar JSON (API/SWagger)
app.use(methodOverride('_method'));                   // Para soportar PUT y DELETE en HTML
app.use(express.static('public'));                    // Para servir CSS, imágenes, etc.

// Rutas
app.use('/products', productRoutes);
// app.use('/auth', authRoutes); // BONUS Firebase

// Ruta raíz que redirige al catálogo
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));