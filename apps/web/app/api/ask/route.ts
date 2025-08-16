import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

class QueryPlanningAgent {
  async plan(question: string): Promise<{
    sql: string
    explanation: string
    data?: any[]
    chartType?: string
    executionTime?: number
  }> {
    const startTime = Date.now()

    // Simple pattern matching for demo questions
    const patterns = [
      {
        pattern: /total revenue.*(\d+)\s*days?.*by region/i,
        handler: this.handleRevenueByRegion.bind(this),
      },
      {
        pattern: /top\s*(\d+)\s*products.*revenue/i,
        handler: this.handleTopProducts.bind(this),
      },
      {
        pattern: /month.*month.*revenue/i,
        handler: this.handleMonthOverMonth.bind(this),
      },
      {
        pattern: /orders.*channel.*(\d+)\s*days?/i,
        handler: this.handleOrdersByChannel.bind(this),
      },
      {
        pattern: /average order value.*region.*(\d+)\s*days?/i,
        handler: this.handleAverageOrderValue.bind(this),
      },
    ]

    for (const { pattern, handler } of patterns) {
      const match = question.match(pattern)
      if (match) {
        const result = await handler(match)
        return {
          ...result,
          executionTime: Date.now() - startTime,
        }
      }
    }

    // Default fallback
    return {
      sql: "SELECT COUNT(*) as total_orders FROM orders",
      explanation: "I couldn't understand your specific question, so here's the total number of orders.",
      data: [{ total_orders: 1250 }],
      chartType: "table",
      executionTime: Date.now() - startTime,
    }
  }

  private async handleRevenueByRegion(match: RegExpMatchArray) {
    const days = Number.parseInt(match[1]) || 30
    const sql = `
      SELECT c.region, SUM(o.total) as revenue
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY c.region
      ORDER BY revenue DESC
    `

    // Mock data for demo
    const data = [
      { region: "North America", revenue: 125000 },
      { region: "Europe", revenue: 98000 },
      { region: "Asia Pacific", revenue: 87000 },
      { region: "Latin America", revenue: 45000 },
    ]

    return {
      sql,
      explanation: `Here's the total revenue for the last ${days} days broken down by region.`,
      data,
      chartType: "bar",
    }
  }

  private async handleTopProducts(match: RegExpMatchArray) {
    const limit = Number.parseInt(match[1]) || 10
    const sql = `
      SELECT p.name, SUM(oi.quantity * oi.price) as revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      WHERE o.created_at >= DATE_TRUNC('quarter', NOW())
      GROUP BY p.id, p.name
      ORDER BY revenue DESC
      LIMIT ${limit}
    `

    // Mock data for demo
    const data = Array.from({ length: limit }, (_, i) => ({
      name: `Product ${i + 1}`,
      revenue: Math.floor(Math.random() * 50000) + 10000,
    })).sort((a, b) => b.revenue - a.revenue)

    return {
      sql,
      explanation: `Here are the top ${limit} products by revenue this quarter.`,
      data,
      chartType: "bar",
    }
  }

  private async handleMonthOverMonth(match: RegExpMatchArray) {
    const sql = `
      SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(total) as revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '24 months'
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY month
    `

    // Mock data for demo
    const data = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      return {
        month: date.toISOString().slice(0, 7),
        revenue: Math.floor(Math.random() * 100000) + 50000,
      }
    })

    return {
      sql,
      explanation: "Here's the month-over-month revenue trend for the past year.",
      data,
      chartType: "line",
    }
  }

  private async handleOrdersByChannel(match: RegExpMatchArray) {
    const days = Number.parseInt(match[1]) || 14
    const sql = `
      SELECT channel, COUNT(*) as orders
      FROM orders
      WHERE created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY channel
      ORDER BY orders DESC
    `

    // Mock data for demo
    const data = [
      { channel: "Online", orders: 450 },
      { channel: "Mobile App", orders: 320 },
      { channel: "In-Store", orders: 180 },
      { channel: "Phone", orders: 95 },
    ]

    return {
      sql,
      explanation: `Here are the orders by channel for the last ${days} days.`,
      data,
      chartType: "bar",
    }
  }

  private async handleAverageOrderValue(match: RegExpMatchArray) {
    const days = Number.parseInt(match[1]) || 90
    const sql = `
      SELECT c.region, AVG(o.total) as avg_order_value
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE o.created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY c.region
      ORDER BY avg_order_value DESC
    `

    // Mock data for demo
    const data = [
      { region: "North America", avg_order_value: 125.5 },
      { region: "Europe", avg_order_value: 98.75 },
      { region: "Asia Pacific", avg_order_value: 87.25 },
      { region: "Latin America", avg_order_value: 65.0 },
    ]

    return {
      sql,
      explanation: `Here's the average order value by region for the last ${days} days.`,
      data,
      chartType: "bar",
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { question } = await request.json()

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    const agent = new QueryPlanningAgent()
    const result = await agent.plan(question)

    // Log the query for audit purposes
    await prisma.queryLog.create({
      data: {
        userId: session.user.id,
        workspaceId: "demo-workspace", // In a real app, get from session
        sqlHash: Buffer.from(result.sql).toString("base64"),
        sql: result.sql,
        affectedRows: result.data?.length || 0,
        durationMs: result.executionTime || 0,
        success: true,
        policySnapshot: {},
      },
    })

    return NextResponse.json({
      explanation: result.explanation,
      data: result.data,
      chartType: result.chartType,
      sql: result.sql,
    })
  } catch (error) {
    console.error("Ask API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
