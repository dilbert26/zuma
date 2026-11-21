import "server-only";

import { Pool } from "pg";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL no esta configurada");
}

const globalForPg = globalThis as unknown as {
  pool: Pool | undefined;
};

const ca = readFileSync(join(process.cwd(), "certs", "prod-ca-2021.crt"), "utf8");

export const pool =
  globalForPg.pool ??
  new Pool({
    connectionString: databaseUrl,
    ssl: {
      ca: ca,
      rejectUnauthorized: true,
    },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
}
