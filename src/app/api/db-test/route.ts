import { pool } from "@/lib/db";

export async function GET() {
  try {
    await pool.query("SELECT 1");

    return Response.json(
      {
        success: true,
        message: "Conexion a PostgreSQL exitosa",
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    console.error("Error de conexion a PostgreSQL");

    return Response.json(
      {
        success: false,
        message: "Servicio no disponible",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
