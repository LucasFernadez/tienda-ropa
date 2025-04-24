// views/utils.js
export const baseHtml = (title) => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header>
    <h1>${title}</h1>
  </header>
`;

export function getNavBar(isDashboard) {
  return `
    <nav>
      <a href="/products">Tienda</a>
      ${isDashboard
        ? `
          <a href="/products/dashboard">Dashboard</a>
          <a href="/products/dashboard/new" class="button">Nuevo Producto</a>
          <form action="/auth/logout" method="POST" style="display:inline">
            <button type="submit">Logout</button>
          </form>
        `
        : `<a href="/auth/login">Login</a>`}
    </nav>
  `;
}

export const getProductCards = (products, isDashboard) => {
  return products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h2>${p.name}</h2>
      <p>${p.description}</p>
      <p>${p.price}€</p>
      <a href="/products/${p._id}">Ver detalle</a>
      ${isDashboard ? `
        <a href="/products/dashboard/${p._id}/edit">Editar</a>
        <form action="/products/dashboard/${p._id}/delete?_method=DELETE" method="POST" style="display:inline">
          <button type="submit">Eliminar</button>
        </form>
      ` : ''}
    </div>
  `).join('');
};

export const getProductDetail = (p, isDashboard) => `
  <div class="product-detail">
    <img src="${p.image}" alt="${p.name}">
    <h2>${p.name}</h2>
    <p>${p.description}</p>
    <p>Precio: ${p.price}€</p>
    <p>Categoría: ${p.category} | Talla: ${p.size}</p>
    ${isDashboard ? `
      <a href="/products/dashboard/${p._id}/edit">Editar</a>
      <form action="/products/dashboard/${p._id}/delete?_method=DELETE" method="POST" style="display:inline">
        <button type="submit">Eliminar</button>
      </form>
    ` : ''}
  </div>
`;

export const getProductForm = (product = {}) => `
  <form action="${product._id ? `/products/dashboard/${product._id}/edit?_method=PUT` : '/products/dashboard?_method=POST'}" method="POST">
    <label>Nombre:<input type="text" name="name" value="${product.name || ''}" required></label>
    <label>Descripción:<textarea name="description">${product.description || ''}</textarea></label>
    <label>Imagen (URL):<input type="text" name="image" value="${product.image || ''}"></label>
    <label>Categoría:
      <select name="category" required>
        ${['Camisetas','Pantalones','Zapatos','Accesorios']
          .map(cat => `<option ${product.category===cat?'selected':''}>${cat}</option>`).join('')}
      </select>
    </label>
    <label>Talla:
      <select name="size" required>
        ${['XS','S','M','L','XL']
          .map(sz => `<option ${product.size===sz?'selected':''}>${sz}</option>`).join('')}
      </select>
    </label>
    <label>Precio:<input type="number" step="0.01" name="price" value="${product.price||0}" required></label>
    <button type="submit">${product._id ? 'Actualizar' : 'Crear'}</button>
  </form>
`;

export const closeHtml = () => `
  </main>
  <footer>© Tienda de Ropa</footer>
  </body>
  </html>
`;
