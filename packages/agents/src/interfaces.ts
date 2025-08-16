export interface Agent {
  process(payload: any): Promise<AgentResult>
}

export interface AgentResult {
  success: boolean
  data?: any
  error?: string
  metadata?: Record<string, any>
}

export interface AgentMessage {
  taskId: string
  workspaceId: string
  agentType: string
  payload: any
  createdAt: Date
  retryCount?: number
}

export interface SourceAgent extends Agent {
  connect(config: any): Promise<boolean>
  listSchemas(): Promise<string[]>
  listTables(schema?: string): Promise<string[]>
  getPreview(params: { schema?: string; table: string }): Promise<any[]>
}

export interface PreparationAgent extends Agent {
  compileGraph(graph: any): Promise<string>
  validateGraph(graph: any): Promise<boolean>
}

export interface SchemaAgent extends Agent {
  introspect(connectionId: string): Promise<any>
  detectChanges(connectionId: string): Promise<any[]>
}

export interface QueryPlanningAgent extends Agent {
  plan(question: string): Promise<{
    sql: string
    explanation: string
    data?: any[]
    chartType?: string
    executionTime?: number
  }>
}

export interface VisualizationAgent extends Agent {
  selectChartType(data: any[], intent?: string): Promise<string>
  generateChart(data: any[], type: string): Promise<any>
}

export interface ExplainerAgent extends Agent {
  explainQuery(sql: string): Promise<string>
  suggestOptimizations(sql: string): Promise<string[]>
}

export interface ForecastAgent extends Agent {
  forecast(data: any[], periods: number): Promise<any[]>
  detectAnomalies(data: any[]): Promise<any[]>
}

export interface GovernanceAgent extends Agent {
  applyMasking(data: any[], policies: any[]): Promise<any[]>
  validateAccess(userId: string, resource: string): Promise<boolean>
}
