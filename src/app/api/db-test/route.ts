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
  } catch (error) {
    const err = error as Error & { code?: string };

    console.error("Error PostgreSQL:", {
      name: err.name,
      code: err.code,
      message: err.message,
    });

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
