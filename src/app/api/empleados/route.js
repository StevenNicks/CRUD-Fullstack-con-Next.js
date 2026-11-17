import db from "../../../lib/db";

// GET: LISTAR EMPLEADOS
export async function GET() {
    try {
        const empleados = db.prepare(
            "SELECT * FROM empleados"
        ).all();

        return Response.json(empleados);

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// POST: CREAR EMPLEADO
export async function POST(request) {
    try {
        const { nombres, apellidos, correo } = await request.json();

        const result = db.prepare(`
            INSERT INTO empleados (nombres, apellidos, correo)
            VALUES (?, ?, ?)
        `).run(nombres, apellidos, correo);

        return Response.json({
            message: "Empleado creado correctamente",
            id: Number(result.lastInsertRowid)
        }, { status: 201 });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}