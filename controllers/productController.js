import Product from '../models/Product.js';
import {
  baseHtml,
  getNavBar,
  getProductCards,
  getProductDetail,
  getProductForm
} from '../views/utils.js';

// Mostrar todos los productos (público o dashboard)
export const showProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const isDashboard = req.originalUrl.includes('/dashboard');
    const content = getProductCards(products, isDashboard);
    res.send(baseHtml('Productos') + getNavBar(isDashboard) + content);
  } catch (error) {
    res.status(500).send(baseHtml('Error') + `<p>Hubo un error: ${error.message}</p>`);
  }
};

// Mostrar detalle de un producto
export const showProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send(baseHtml('No encontrado') + '<p>Producto no encontrado</p>');
    }
    const isDashboard = req.originalUrl.includes('/dashboard');
    const detail = getProductDetail(product, isDashboard);
    res.send(baseHtml(product.name) + getNavBar(isDashboard) + detail);
  } catch (error) {
    res.status(500).send(baseHtml('Error') + `<p>Hubo un error: ${error.message}</p>`);
  }
};

// Formulario para nuevo producto
export const showNewProduct = (req, res) => {
  const form = getProductForm();
  res.send(baseHtml('Nuevo Producto') + getNavBar(true) + form);
};

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    await Product.create({ name, description, image, category, size, price });
    res.redirect('/products/dashboard');
  } catch (error) {
    res.status(400).send(baseHtml('Error') + `<p>Datos inválidos: ${error.message}</p>`);
  }
};

// Formulario para editar producto
export const showEditProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send(baseHtml('No encontrado') + '<p>Producto no encontrado</p>');
    }
    const form = getProductForm(product);
    res.send(baseHtml('Editar Producto') + getNavBar(true) + form);
  } catch (error) {
    res.status(500).send(baseHtml('Error') + `<p>Hubo un error: ${error.message}</p>`);
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;
    await Product.findByIdAndUpdate(productId, updates, { runValidators: true });
    res.redirect(`/products/dashboard/${productId}`);
  } catch (error) {
    res.status(400).send(baseHtml('Error') + `<p>Actualización fallida: ${error.message}</p>`);
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.redirect('/products/dashboard');
  } catch (error) {
    res.status(500).send(baseHtml('Error') + `<p>No se pudo eliminar: ${error.message}</p>`);
  }
};