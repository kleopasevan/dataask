import { Pool } from "pg"
import { BaseConnector } from "./base-connector"

export class PostgresConnector extends BaseConnector {
  private pool: Pool | null = null

  async connect(): Promise<boolean> {
    try {
      this.pool = new Pool({
        connectionString: this.config.connectionString,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      })

      // Test connection
      const client = await this.pool.connect()
      await client.query("SELECT 1")
      client.release()

      return true
    } catch (error) {
      console.error("PostgreSQL connection failed:", error)
      return false
    }
  }

  async listSchemas(): Promise<string[]> {
    if (!this.pool) throw new Error("Not connected")

    const result = await this.pool.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY schema_name
    `)

    return result.rows.map((row) => row.schema_name)
  }

  async listTables(schema = "public"): Promise<string[]> {
    if (!this.pool) throw new Error("Not connected")

    const result = await this.pool.query(
      `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = $1 AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `,
      [schema],
    )

    return result.rows.map((row) => row.table_name)
  }

  async getPreview(params: { schema?: string; table: string; limit?: number }): Promise<any[]> {
    if (!this.pool) throw new Error("Not connected")

    const { schema = "public", table, limit = 100 } = params
    const result = await this.pool.query(
      `
      SELECT * FROM "${schema}"."${table}" LIMIT $1
    `,
      [limit],
    )

    return result.rows
  }

  async runQuery(params: { sql: string; params?: any[] }): Promise<any[]> {
    if (!this.pool) throw new Error("Not connected")

    const { sql, params: queryParams = [] } = params
    const result = await this.pool.query(sql, queryParams)

    return result.rows
  }

  async capabilities(): Promise<string[]> {
    return ["SELECT", "JOIN", "GROUP_BY", "ORDER_BY", "LIMIT", "AGGREGATE_FUNCTIONS", "WINDOW_FUNCTIONS"]
  }

  async introspect(): Promise<any> {
    if (!this.pool) throw new Error("Not connected")

    const schemas = await this.listSchemas()
    const result: any = {}

    for (const schema of schemas) {
      const tables = await this.listTables(schema)
      result[schema] = {}

      for (const table of tables) {
        const columns = await this.pool.query(
          `
          SELECT 
            column_name,
            data_type,
            is_nullable,
            column_default
          FROM information_schema.columns
          WHERE table_schema = $1 AND table_name = $2
          ORDER BY ordinal_position
        `,
          [schema, table],
        )

        result[schema][table] = columns.rows
      }
    }

    return result
  }

  async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.end()
      this.pool = null
    }
  }
}
