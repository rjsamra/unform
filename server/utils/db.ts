import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';

import pg from 'pg';

let client: pg.Client | null;
let drizzleInstance: NodePgDatabase;

export async function useDatabase() {
  try {
    const config = useRuntimeConfig();
    if (client && drizzleInstance) return drizzleInstance;

    if (!config.db.host) throw new Error('Missing db.host in runtime config');

    // SSL is opt-in. Dokploy/self-hosted Postgres usually has no SSL.
    // Set NUXT_DB_SSL=true for providers that require it (e.g. AWS RDS).
    const useSsl = process.env.NUXT_DB_SSL === 'true';

    client = new pg.Client({
      ...config.db,
      ssl: useSsl
        ? {
            rejectUnauthorized: false,
          }
        : false,
    });

    await client.connect();

    drizzleInstance = drizzle(client);
    return drizzleInstance;
  } catch (error) {
    console.error('Error setting up database', error);
    throw error;
  }
}
