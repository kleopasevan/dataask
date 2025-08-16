"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Database, MessageSquare, Send, Copy, Download, LayoutDashboard, RefreshCw } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  data?: any
  chartType?: string
  isError?: boolean
  timestamp: Date
}

export default function AskPage() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handleCancel = () => {
    setIsLoading(false)
    // Remove the last two messages (user prompt and loading indicator)
    setMessages((prev) => prev.slice(0, -2))
  }

  const handleSubmit = async (e: React.FormEvent, retryQuery?: string) => {
    e.preventDefault()
    const currentQuery = retryQuery || query
    if (!currentQuery.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentQuery,
      timestamp: new Date(),
    }

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Analyzing your query...",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    if (!retryQuery) setQuery("")

    try {
      // Simulate API call with potential error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random errors for demo
          if (Math.random() < 0.2) {
            reject(new Error("Database connection timeout. Please try again."))
          } else {
            resolve({
              query: currentQuery,
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
          }
        }, 2000)
      })

      // Success response
      const successMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: `Here are the results for: "${currentQuery}"`,
        data: [
          { product_name: "Premium Headphones", total_revenue: 125000 },
          { product_name: "Wireless Speaker", total_revenue: 98000 },
          { product_name: "Smart Watch", total_revenue: 87000 },
          { product_name: "Bluetooth Earbuds", total_revenue: 76000 },
          { product_name: "Gaming Mouse", total_revenue: 65000 },
        ],
        chartType: "table",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev.slice(0, -1), successMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: error instanceof Error ? error.message : "An unexpected error occurred",
        isError: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev.slice(0, -1), errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = (errorMessageIndex: number) => {
    // Find the preceding user message
    for (let i = errorMessageIndex - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        const syntheticEvent = { preventDefault: () => {} } as React.FormEvent
        handleSubmit(syntheticEvent, messages[i].content)
        break
      }
    }
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
                {isLoading ? (
                  <>
                    <Button type="submit" disabled className="bg-blue-600 hover:bg-blue-700">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCancel}
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button type="submit" disabled={!query.trim()} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                )}
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

          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={message.id} className="space-y-4">
                  {message.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-2xl">{message.content}</div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <div
                        className={`p-4 rounded-2xl max-w-4xl w-full ${
                          message.isError
                            ? "bg-destructive/10 border border-destructive"
                            : "bg-zinc-900 border border-zinc-800"
                        }`}
                      >
                        <p className={`mb-3 ${message.isError ? "text-red-400" : "text-zinc-300"}`}>
                          {message.content}
                        </p>

                        {message.data && message.chartType && (
                          <div className="mt-4">
                            <div className="overflow-x-auto">
                              <table className="w-full border-collapse">
                                <thead>
                                  <tr className="border-b border-zinc-700">
                                    <th className="text-left p-2 font-medium text-zinc-300">Product Name</th>
                                    <th className="text-right p-2 font-medium text-zinc-300">Revenue</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {message.data.map((row: any, rowIndex: number) => (
                                    <tr key={rowIndex} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                                      <td className="p-2 text-zinc-300">{row.product_name}</td>
                                      <td className="p-2 text-right font-mono text-zinc-300">
                                        ${row.total_revenue.toLocaleString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {message.data && message.chartType && (
                          <div className="border-t border-zinc-700 mt-4 pt-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent"
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Copy SQL
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download CSV
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent"
                              >
                                <LayoutDashboard className="h-4 w-4 mr-1" />
                                Add to Dashboard
                              </Button>
                            </div>
                          </div>
                        )}

                        {message.isError && (
                          <div className="mt-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRetry(index)}
                              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Retry
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
