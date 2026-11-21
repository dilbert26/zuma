
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    const url = new URL(databaseUrl ?? "");

    console.log("Diagnostico DATABASE_URL:", {
      protocoloCorrecto: url.protocol === "postgresql:",
      servidorCorrecto:
        url.hostname === "aws-1-us-east-1.pooler.supabase.com",
      servidorEsBase: url.hostname === "base",
      puertoCorrecto: url.port === "6543",
      usuarioCorrecto:
        url.username === "zuma_app.gdtytvohawxsvtqtigek",
      baseDeDatosCorrecta: url.pathname === "/postgres",
      tienePassword: url.password.length > 0,
    });

    await pool.query("SELECT 1");

    return Response.json(
      {
        success: true,
        message: "Conexion a PostgreSQL exitosa",
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    const err = error as Error & { code?: string };

    console.error("Error PostgreSQL:", {
      name: err.name,
      code: err.code,
    });

    return Response.json(
      {
        success: false,
        message: "Servicio no disponible",
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}
