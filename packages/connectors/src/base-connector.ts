export abstract class BaseConnector {
  protected config: any

  constructor(config: any) {
    this.config = config
  }

  abstract connect(): Promise<boolean>
  abstract listSchemas(): Promise<string[]>
  abstract listTables(schema?: string): Promise<string[]>
  abstract getPreview(params: { schema?: string; table: string; limit?: number }): Promise<any[]>
  abstract runQuery(params: { sql: string; params?: any[] }): Promise<any[]>
  abstract capabilities(): Promise<string[]>
  abstract introspect(): Promise<any>
  abstract disconnect(): Promise<void>
}
