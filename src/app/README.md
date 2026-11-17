# Tecnologías y dependencias

Proyecto CRUD desarrollado con Next.js, React y SQLite.

## 1. Tecnologías principales

| Tecnología | Versión | Función |
|---|---|---|
| Next.js | 16.4.6 | Framework para desarrollar el frontend y la API. |
| React | 19.3.0 | Biblioteca para construir interfaces de usuario. |
| React DOM | 19.3.0 | Permite renderizar componentes React en el navegador. |
| SQLite | — | Base de datos para almacenar la información. |
| better-sqlite3 | 13.2.0 | Permite conectar la aplicación con SQLite y ejecutar consultas SQL. |
| JavaScript | — | Lenguaje utilizado para desarrollar la aplicación. |

## 2. Dependencias de desarrollo

| Dependencia | Versión | Función |
|---|---|---|
| Tailwind CSS | 4.3.3 | Framework CSS para diseñar y personalizar la interfaz. |
| @tailwindcss/turbopack | 4.3.3 | Integración de Tailwind CSS con Turbopack. |
| TypeScript | 5 | Herramientas de soporte para tipado estático. |
| ESLint | 9 | Analiza el código para detectar errores y mantener buenas prácticas. |
| eslint-config-next | 16.4.6 | Reglas de ESLint específicas para proyectos Next.js. |
| @types/better-sqlite3 | 9.6.0 | Definiciones de tipos para better-sqlite3. |
| @types/node | 20 | Definiciones de tipos para Node.js. |
| @types/react | 19 | Definiciones de tipos para React. |
| @types/react-dom | 19 | Definiciones de tipos para React DOM. |

## 3. Scripts disponibles

Se pueden ejecutar desde la terminal:

| Comando | Función |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo. |
| `pnpm build` | Genera la versión de producción. |
| `pnpm start` | Inicia la aplicación en modo producción. |
| `pnpm lint` | Ejecuta ESLint para revisar el código. |

## 4. Gestor de paquetes

El proyecto utiliza **pnpm 10.28.2** para instalar y administrar las dependencias.

Instalar las dependencias:

```bash
pnpm install
```

Iniciar el proyecto:

```bash
pnpm dev
```

Acceder desde el navegador:

```text
http://localhost:3000
```

---

**Resumen:** Next.js y React gestionan la aplicación, better-sqlite3 permite trabajar con SQLite, Tailwind CSS facilita los estilos y ESLint ayuda a mantener la calidad del código.