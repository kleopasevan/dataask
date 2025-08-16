"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Database, MessageSquare, Send, TrendingUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function AskPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setResult({
        query,
        sql: "SELECT product_name, SUM(revenue) as total_revenue FROM sales GROUP BY product_name ORDER BY total_revenue DESC LIMIT 5",
        data: [
          { product_name: "Premium Headphones", total_revenue: 125000 },
          { product_name: "Wireless Speaker", total_revenue: 98000 },
          { product_name: "Smart Watch", total_revenue: 87000 },
          { product_name: "Bluetooth Earbuds", total_revenue: 76000 },
          { product_name: "Gaming Mouse", total_revenue: 65000 },
        ],
        insights: [
          "Premium Headphones lead with $125K revenue",
          "Top 5 products account for 68% of total sales",
          "Audio products dominate the top performers",
        ],
      })
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white">DataAsk</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
              Demo Mode
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Query Input */}
          <Card className="mb-8 bg-zinc-900 border-zinc-800 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="h-5 w-5" />
                Ask Your Data
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Type your question in natural language and get instant insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., What are our top 5 products by revenue?"
                  className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !query.trim()} className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sample Questions */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card
              className="cursor-pointer hover:bg-zinc-800 transition-colors bg-zinc-900 border-zinc-800 rounded-xl"
              onClick={() => setQuery("What are our top 5 products by revenue?")}
            >
              <CardContent className="p-4">
                <p className="text-sm text-zinc-500">Sample Question</p>
                <p className="font-medium text-zinc-300">What are our top 5 products by revenue?</p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:bg-zinc-800 transition-colors bg-zinc-900 border-zinc-800 rounded-xl"
              onClick={() => setQuery("Show me sales trends by month")}
            >
              <CardContent className="p-4">
                <p className="text-sm text-zinc-500">Sample Question</p>
                <p className="font-medium text-zinc-300">Show me sales trends by month</p>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Query Summary */}
              <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Query Results</CardTitle>
                  <CardDescription className="text-zinc-400">"{result.query}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-zinc-800 p-3 rounded-xl font-mono text-sm text-zinc-300 border border-zinc-700">
                    {result.sql}
                  </div>
                </CardContent>
              </Card>

              {/* Data Table */}
              <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <BarChart3 className="h-5 w-5" />
                    Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left p-2 font-medium text-zinc-300">Product Name</th>
                          <th className="text-right p-2 font-medium text-zinc-300">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.data.map((row: any, index: number) => (
                          <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="p-2 text-zinc-300">{row.product_name}</td>
                            <td className="p-2 text-right font-mono text-zinc-300">
                              ${row.total_revenue.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.insights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-zinc-300">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
