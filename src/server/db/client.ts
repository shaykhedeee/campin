import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function createCampInDb(databaseUrl = process.env.DATABASE_URL) {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to create the CampIn database client.");
  }

  const client = postgres(databaseUrl, { prepare: false });
  return drizzle(client, { schema });
}
