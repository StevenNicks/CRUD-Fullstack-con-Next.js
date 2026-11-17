# API – Gestión de empleados

API REST desarrollada con Next.js App Router y SQLite para realizar operaciones CRUD sobre empleados.

## 1. Estructura de carpetas

```text
my-app/
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── empleados/
│   │       │   ├── [id]/
│   │       │   │   └── route.js
│   │       │   └── route.js
│   │       └── test-db/
│   │           └── route.js
│   └── lib/
│       └── db.js
├── database.sqlite
└── package.json
```

**Descripción:**

- `src/app/api/`: contiene las rutas de la API.
- `empleados/route.js`: operaciones generales de empleados (GET y POST).
- `empleados/[id]/route.js`: operaciones sobre un empleado específico (GET, PUT y DELETE).
- `test-db/route.js`: endpoint para comprobar la conexión con SQLite.
- `src/lib/db.js`: configuración de la conexión y creación de la base de datos.
- `database.sqlite`: archivo físico de la base de datos.

## 2. Base de datos

### 2.1. Tecnología utilizada

Se utiliza **SQLite** como sistema de gestión de bases de datos, mediante la dependencia `better-sqlite3`.

A diferencia de otros motores como MySQL o PostgreSQL, SQLite almacena la información directamente en un archivo local (`database.sqlite`), sin necesidad de configurar un servidor de base de datos independiente.

### 2.2. Creación de la base de datos

La conexión y creación de la base de datos se configuran en:

`src/lib/db.js`

```javascript
import Database from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS empleados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        correo TEXT NOT NULL
    );
`);

export default db;
```

**Funcionamiento:**

1. Se importa `better-sqlite3` para trabajar con SQLite.
2. Se construye la ruta del archivo `database.sqlite` en la raíz del proyecto.
3. Se establece la conexión con la base de datos. Si el archivo no existe, SQLite lo crea automáticamente.
4. Se ejecuta una sentencia SQL que crea la tabla `empleados` si todavía no existe.
5. Se exporta la conexión para utilizarla desde los endpoints de la API.

### 2.3. Estructura de la tabla empleados

| Campo | Tipo de dato | Restricciones |
|---|---|---|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT |
| `nombres` | TEXT | NOT NULL |
| `apellidos` | TEXT | NOT NULL |
| `correo` | TEXT | NOT NULL |

**Ejemplo de registro:**

| id | nombres | apellidos | correo |
|---|---|---|---|
| 1 | Steven | Alvarado | steven@example.com |

---

## 3. Rutas de la API

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/api/empleados` | Obtener todos los empleados. |
| POST | `/api/empleados` | Crear un empleado. |
| GET | `/api/empleados/:id` | Obtener un empleado por ID. |
| PUT | `/api/empleados/:id` | Actualizar un empleado. |
| DELETE | `/api/empleados/:id` | Eliminar un empleado. |
| GET | `/api/test-db` | Comprobar la conexión con SQLite. |

---

## 4. Pruebas de la API

Las pruebas se pueden realizar utilizando **Postman** o **Thunder Client**.

### 4.1. Iniciar el servidor

Ejecutar el siguiente comando:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

### 4.2. Verificar la conexión con la base de datos

- **Método:** `GET`
- **URL:** `http://localhost:3000/api/test-db`
- **Body:** No requiere.

Esta ruta permite comprobar que la aplicación puede conectarse a SQLite y ejecutar una consulta.

**Resultado esperado:** respuesta exitosa que confirme que la conexión funciona correctamente.

### 4.3. Listar todos los empleados

- **Método:** `GET`
- **URL:** `http://localhost:3000/api/empleados`
- **Body:** No requiere.

**Respuesta esperada (200 OK):**

```json
[
  {
    "id": 1,
    "nombres": "Steven",
    "apellidos": "Alvarado",
    "correo": "steven@example.com"
  }
]
```

Si no existen registros, debe devolver un arreglo vacío:

```json
[]
```

### 4.4. Crear un empleado

- **Método:** `POST`
- **URL:** `http://localhost:3000/api/empleados`
- **Header:** `Content-Type: application/json`
- **Body:** `raw` → `JSON`.

```json
{
  "nombres": "Steven",
  "apellidos": "Alvarado",
  "correo": "steven@example.com"
}
```

**Resultado esperado:** creación exitosa del empleado, incluyendo su identificador.

### 4.5. Consultar un empleado por ID

- **Método:** `GET`
- **URL:** `http://localhost:3000/api/empleados/1`
- **Body:** No requiere.

Reemplazar `1` por el ID del empleado que se desea consultar.

**Respuesta esperada (200 OK):**

```json
{
  "id": 1,
  "nombres": "Steven",
  "apellidos": "Alvarado",
  "correo": "steven@example.com"
}
```

Si el empleado no existe, debe devolver `404 Not Found`.

### 4.6. Actualizar un empleado

- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/empleados/1`
- **Header:** `Content-Type: application/json`
- **Body:** `raw` → `JSON`.

```json
{
  "nombres": "Steven Andrés",
  "apellidos": "Alvarado",
  "correo": "stevenandres@example.com"
}
```

Reemplazar `1` por el ID del empleado que se desea actualizar.

**Resultado esperado:** confirmación de actualización exitosa.

Si el empleado no existe, debe devolver `404 Not Found`.

### 4.7. Eliminar un empleado

- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/empleados/1`
- **Body:** No requiere.

Reemplazar `1` por el ID del empleado que se desea eliminar.

**Resultado esperado:** confirmación de eliminación exitosa.

Si el empleado no existe, debe devolver `404 Not Found`.

---

## 5. Orden recomendado de pruebas

Para comprobar el funcionamiento completo de la API, ejecutar las pruebas en este orden:

1. `GET /api/test-db` – Verificar conexión con SQLite.
2. `GET /api/empleados` – Consultar los registros existentes.
3. `POST /api/empleados` – Crear un empleado.
4. `GET /api/empleados/:id` – Consultar el empleado creado.
5. `PUT /api/empleados/:id` – Actualizar sus datos.
6. `GET /api/empleados` – Verificar los cambios.
7. `DELETE /api/empleados/:id` – Eliminar el empleado.
8. `GET /api/empleados` – Comprobar que ya no aparece.

---

## 6. Tecnologías utilizadas

- **Next.js:** framework para el desarrollo de la aplicación y API.
- **JavaScript:** lenguaje de programación.
- **SQLite:** sistema de gestión de bases de datos.
- **better-sqlite3:** dependencia para conectar y ejecutar consultas SQL.
- **Postman / Thunder Client:** herramientas para probar los endpoints.