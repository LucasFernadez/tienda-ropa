# Tienda de Ropa

Una aplicación web completa para gestionar una tienda de ropa, con catálogo público y panel de administración (dashboard). Incluye:

- **Catálogo de productos**: visualización, detalle y búsqueda.  
- **Dashboard de administración**: CRUD crear, leer, actualizar, eliminar productos.  
- **Autenticación de administradores** con Firebase.  
- **Tests** automatizados con Jest y Supertest.  
- **API REST** documentada con Swagger para consumo por frontends externos.  
- **Despliegue** en plataformas como Render.

---

## Características principales

1. **Productos**  
   - Almacena información de cada prenda: nombre, descripción, imagen, categoría, talla y precio.  
   - Vistas SSR (Server-Side Rendering) con HTML dinámico generado mediante template literals.

2. **Administración**  
   - Dashboard protegido por autenticación Firebase.  
   - Formularios para crear y editar productos.  
   - Eliminación segura con confirmación.

3. **Autenticación**  
   - Login/Logout usando Firebase Admin SDK.  
   - Control de sesiones con cookies `__session`.

4. **API REST** (Bonus)  
   - Endpoints JSON listos para integrar con aplicaciones SPA (React, Vue).  
   - Documentación Swagger accesible desde `/api-docs`.

5. **Tests**  
   - Unitarios e integración de rutas usando Jest y Supertest.

---