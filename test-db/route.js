import db from "../../../lib/db";

export async function GET() {
    try {
        const empleados = db.prepare(
            "SELECT * FROM empleados"
        ).all();

        return Response.json({
            success: true,
            message: "SQLite conectado correctamente",
            data: empleados
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}