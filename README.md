# QuickBite
![Logo](./assets/screenshot1.png)
**QuickBite** es una aplicación diseñada para buscar recetas, su función más destacada es permitir a los usuarios ingresar los ingredientes que tienen disponibles. A partir de esta información, la app sugiere recetas que pueden preparar con esos ingredientes, además, ajusta las cantidades según las necesidades del usuario.

## Demo

https://quick-bite-eight.vercel.app/profile

## Características principales

- Sugerencia de recetas a partir de los ingredientes en tu cocina
- Filtrar por tipo de comida
- Guardar recetas que te gusten
- Interfaz intuitiva construida con React + Redux

## Tecnologías usadas

- [React](https://reactjs.org/) – Biblioteca principal para construir la interfaz
- [Redux Toolkit](https://redux-toolkit.js.org/) – Manejo del estado global
- [Material UI](https://mui.com/) – Componentes de interfaz
- [Vite](https://vitejs.dev/) – Empaquetador y servidor de desarrollo rápido
- [react-router-dom](https://reactrouter.com/) – Navegación entre páginas


##  Cómo empezar

### Prerrequisitos

- Node.js
- npm

### Instalación

```bash
git clone https://github.com/emydorado/quickBite.git
cd quickbite
npm install
npm run dev
```

### Estructura del proyecto

```bash
src/
├── components/         # Componentes reutilizables (botones, inputs, etc.)
├── features/
│   ├── fridge/         # Redux slice para ingredientes en la nevera
│   └── recipes/        # Redux slice para recetas sugeridas
├── pages/              # Páginas principales de la app (Inicio, Recetas, etc.)
├── services/           # Funciones para buscar recetas o consultar APIs
├── hooks/              # Hooks personalizados
├── App.jsx             # Componente principal de la aplicación
├── main.jsx            # Punto de entrada de React
└── store.js            # Configuración del store de Redux
```
### Ejemplo de uso

1. Abre la app

2. Escribe los ingredientes que tienes en tu nevera:
   Por ejemplo: chicken, pepper

4. Haz clic en que tipo de comida buscas:
   Por ejemplo: Dinner

   La app te sugiere recetas como:
   - Grilled checken taco
   - Cheese and Spinach Stuffed Chicken

6. Haz clic en la receta que mas te guste
7. Selecciona las porciones que necesites
8. Hazla
9. Marcala como hecha
