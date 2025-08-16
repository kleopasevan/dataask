import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart3, Database, MessageSquare, Shield, Users, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-zinc-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database className="h-7 w-7 text-blue-500" />
            <h1 className="text-xl font-semibold text-white">DataAsk</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                Sign In
              </Button>
            </Link>
            <Link href="/ask">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Try Demo</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Ask Your Data
            <span className="text-blue-500"> Anything</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Transform natural language questions into powerful insights. DataAsk is the AI-native Business Intelligence
            platform that makes data analysis as simple as having a conversation.
          </p>

          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Input
                placeholder="Try: 'Show me sales trends for the last quarter'"
                className="text-lg py-6 pr-14 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
              />
              <Button className="absolute right-2 top-2 h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-zinc-500 mt-4">
              No SQL knowledge required • Instant visualizations • Enterprise security
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <Link href="/ask">
              <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl">
                <Zap className="mr-2 h-5 w-5" />
                Start Free Demo
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl bg-transparent"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-center text-white mb-16">Why Choose DataAsk?</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-4">
              <MessageSquare className="h-12 w-12 text-blue-500 mb-4" />
              <CardTitle className="text-white">Natural Language Queries</CardTitle>
              <CardDescription className="text-zinc-400">
                Ask questions in plain English and get instant SQL-powered insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-4">
              <BarChart3 className="h-12 w-12 text-green-500 mb-4" />
              <CardTitle className="text-white">Smart Visualizations</CardTitle>
              <CardDescription className="text-zinc-400">
                Automatic chart generation with interactive dashboards and real-time updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-4">
              <Shield className="h-12 w-12 text-red-500 mb-4" />
              <CardTitle className="text-white">Enterprise Security</CardTitle>
              <CardDescription className="text-zinc-400">
                Row-level security, audit logging, and role-based access control
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-4">
              <Database className="h-12 w-12 text-purple-500 mb-4" />
              <CardTitle className="text-white">Data Preparation</CardTitle>
              <CardDescription className="text-zinc-400">
                Visual data pipeline builder with automated quality checks
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-4">
              <Users className="h-12 w-12 text-orange-500 mb-4" />
              <CardTitle className="text-white">Team Collaboration</CardTitle>
              <CardDescription className="text-zinc-400">
                Share insights, create team dashboards, and collaborate on analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-200 rounded-2xl">
            <CardHeader className="pb-4">
              <Zap className="h-12 w-12 text-yellow-500 mb-4" />
              <CardTitle className="text-white">AI-Powered Insights</CardTitle>
              <CardDescription className="text-zinc-400">
                Mixture-of-agents architecture for intelligent data analysis
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="bg-zinc-900/50 rounded-3xl p-12 border border-zinc-800">
          <h3 className="text-3xl font-bold text-center text-white mb-12">Try These Sample Questions</h3>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "What are our top 5 products by revenue this quarter?",
              "Show me customer acquisition trends over the last 6 months",
              "Which regions have the highest customer satisfaction?",
              "What's the average order value by customer segment?",
              "How has our inventory turnover changed year-over-year?",
              "Which marketing channels drive the most conversions?",
            ].map((question, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:bg-zinc-800 transition-all duration-200 bg-zinc-900 border-zinc-700 rounded-xl"
              >
                <CardContent className="p-6">
                  <p className="text-zinc-300">"{question}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-black mt-20">
        <div className="container mx-auto px-6 py-12 text-center text-zinc-500">
          <p>&copy; 2024 DataAsk. AI-native Business Intelligence Platform.</p>
        </div>
      </footer>
    </div>
  )
}
