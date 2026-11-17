# Frontend – Gestión de empleados

Interfaz web desarrollada con Next.js y React para gestionar empleados mediante operaciones CRUD, consumiendo la API REST del proyecto.

## 1. Estructura de carpetas

```text
src/
└── app/
    └── empleados/
        ├── components/
        │   └── EmpleadoForm.js
        └── page.js
```

**Descripción:**

- `src/app/empleados/`: contiene la página principal de gestión de empleados.
- `page.js`: componente principal que muestra la tabla de empleados y gestiona las operaciones CRUD.
- `components/EmpleadoForm.js`: componente destinado al formulario de empleados.

## 2. Funcionamiento del frontend

La interfaz permite realizar las siguientes operaciones:

| Operación | Descripción |
|---|---|
| Consultar | Mostrar todos los empleados registrados. |
| Crear | Registrar un nuevo empleado. |
| Editar | Modificar la información de un empleado. |
| Eliminar | Eliminar un empleado existente. |

### 2.1. Consulta de empleados

Al ingresar a la página, se realiza una petición `GET` a `/api/empleados` para obtener los registros y mostrarlos en una tabla.

### 2.2. Registro de empleados

El usuario completa un formulario con los siguientes campos:

- Nombres.
- Apellidos.
- Correo electrónico.

Al enviar el formulario, se realiza una petición `POST` a `/api/empleados`.

### 2.3. Edición de empleados

Al seleccionar la opción de editar, se cargan los datos del empleado en el formulario.

Al guardar los cambios, se realiza una petición `PUT` a `/api/empleados/:id`.

### 2.4. Eliminación de empleados

Al seleccionar la opción de eliminar, se solicita confirmación antes de ejecutar la operación.

Una vez confirmada, se realiza una petición `DELETE` a `/api/empleados/:id`.

## 3. Gestión del estado

El frontend utiliza los hooks de React para gestionar la información y las interacciones de la interfaz:

| Hook | Función |
|---|---|
| `useState` | Gestionar los empleados y los datos del formulario. |
| `useEffect` | Obtener los empleados al cargar la página. |

## 4. Comunicación con la API

El frontend utiliza `fetch()` para comunicarse con los endpoints del backend.

| Operación | Método HTTP | Endpoint |
|---|---|---|
| Consultar empleados | GET | `/api/empleados` |
| Crear empleado | POST | `/api/empleados` |
| Consultar empleado | GET | `/api/empleados/:id` |
| Actualizar empleado | PUT | `/api/empleados/:id` |
| Eliminar empleado | DELETE | `/api/empleados/:id` |

Las peticiones utilizan las rutas internas de Next.js, por lo que no es necesario configurar una URL externa para el backend cuando frontend y API se ejecutan en el mismo proyecto.

## 5. Ejecución del frontend

### 5.1. Instalar dependencias

```bash
npm install
```

### 5.2. Iniciar el servidor

```bash
npm run dev
```

### 5.3. Acceder a la aplicación

Abrir en el navegador:

```text
http://localhost:3000/empleados
```

## 6. Pruebas funcionales

Para verificar el funcionamiento del frontend:

1. Ingresar a `/empleados`.
2. Comprobar que se muestran los empleados registrados.
3. Crear un empleado y verificar que aparece en la tabla.
4. Editar un empleado y comprobar que sus datos se actualizan.
5. Eliminar un empleado y verificar que desaparece de la tabla.
6. Recargar la página y comprobar que los cambios persisten.

## 7. Tecnologías utilizadas

- **Next.js:** framework de desarrollo.
- **React:** biblioteca para construir la interfaz.
- **JavaScript:** lenguaje de programación.
- **Fetch API:** comunicación HTTP con el backend.