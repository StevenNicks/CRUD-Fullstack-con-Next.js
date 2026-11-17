import Database from "better-sqlite3";
import path from "node:path";

const dbPath = path.join(process.cwd(), "database.sqlite");

// Crear conexión
const db = new Database(dbPath);

// Crear tabla si no existe
db.exec(`
    CREATE TABLE IF NOT EXISTS empleados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        correo TEXT NOT NULL
    );
`);

export default db;