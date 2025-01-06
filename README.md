# 🌟 Tienda UCN - E-Commerce Web 🌟

## 📜Descripción
Bienvenido a Tienda UCN, un e-commerce web creado con Angular 18. Este proyecto permite a los usuarios navegar por productos, agregar artículos al carrito de compras, y realizar autenticaciones para gestionar sus compras. Además, los administradores pueden gestionar el catálogo de productos y usuarios. 🛒

## 🚀Funcionalidades
- 👀 **Visualización de Productos**: Los usuarios pueden ver una lista de productos con detalles como nombre, tipo, precio y disponibilidad.
- 🔍 **Paginación y Filtrado**: Los productos pueden ser filtrados por tipo y ordenados por precio. Además, la lista de productos tiene soporte de paginación para una navegación más sencilla.
- 🛒 **Carrito de Compras**: Los usuarios pueden agregar productos al carrito, ver el total y proceder a la compra.
- 🔑 **Autenticación**: Los usuarios pueden iniciar sesión para realizar compras y administrar su cuenta.
- ⚙️ **Gestión de Productos (Administrador)**: Los administradores pueden añadir, editar y eliminar productos, además de gestionar las cuentas de los clientes.


## 🛠️ Tecnologías Utilizadas

- **Angular 18**: Framework para el desarrollo del frontend.
- **Tailwind CSS**: Framework CSS para el diseño estilizado y responsivo 🎨.
- **Flowbite**: Biblioteca de componentes preconstruidos basada en Tailwind.
- **RxJS**: Programación reactiva para la gestión de datos y suscripciones.
- **API REST**: Backend que sirve como fuente de datos para los usuarios y productos.
- **Autenticación**: JWT (JSON Web Tokens) 🔐 

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- [Angular CLI](https://angular.io/cli) (versión 18 o superior)
- [Tailwind CLI](https://tailwindcss.com/docs/installation)

---

## 📥 Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1. **Clona el Repositorio**

   ```bash
   git clone https://github.com/FernandoChav/Taller_web
   cd taller_web
   ```

2. **Restaura las Dependencias**

   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install
   ```

3. **Configura Tailwind CSS**

   Asegúrate de que el archivo `tailwind.config.js` esté configurado correctamente. Tailwind CSS ya debería estar instalado con el comando anterior.

   Si necesitas verificar la configuración, revisa:

   ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js" // add this line
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
    }
   ```

4. **Verifica la API REST**

   Asegúrate de que el backend esté funcionando en la URL correcta. Por defecto, el proyecto espera que la API esté en: `http://localhost:5026/`.

---

## ⚡ Levantar el Servidor de Desarrollo

Para iniciar la aplicación, ejecuta:

```bash
ng serve
```

Luego, navega a [http://localhost:4200](http://localhost:4200) en tu navegador. El servidor recargará automáticamente los cambios en el código fuente.

---



## 🔧 Problemas Comunes

### Error: "Cannot find module 'tailwindcss'"

Asegúrate de haber ejecutado `npm install` correctamente. Si persiste, instala Tailwind manualmente:

```bash
npm install tailwindcss --save-dev
npx tailwindcss init