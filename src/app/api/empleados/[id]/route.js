import db from "../../../../lib/db";

// GET: CONSULTAR EMPLEADO
export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const empleado = db.prepare(
            "SELECT * FROM empleados WHERE id = ?"
        ).get(id);

        if (!empleado) {
            return Response.json(
                { message: "Empleado no encontrado" },
                { status: 404 }
            );
        }

        return Response.json(empleado);

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// PUT: ACTUALIZAR EMPLEADO
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { nombres, apellidos, correo } = await request.json();

        const result = db.prepare(`
            UPDATE empleados
            SET nombres = ?, apellidos = ?, correo = ?
            WHERE id = ?
        `).run(nombres, apellidos, correo, id);

        if (result.changes === 0) {
            return Response.json(
                { message: "Empleado no encontrado" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "Empleado actualizado correctamente"
        });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

// DELETE: ELIMINAR EMPLEADO
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const result = db.prepare(
            "DELETE FROM empleados WHERE id = ?"
        ).run(id);

        if (result.changes === 0) {
            return Response.json(
                { message: "Empleado no encontrado" },
                { status: 404 }
            );
        }

        return Response.json({
            message: "Empleado eliminado correctamente"
        });

    } catch (error) {
        return Response.json(
            { message: error.message },
            { status: 500 }
        );
    }
}