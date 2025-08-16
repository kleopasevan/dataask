import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, MessageSquare, Wrench, BarChart3 } from "lucide-react"
import Link from "next/link"

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const quickActions = [
    {
      title: "Connect Data",
      description: "Connect to databases and upload CSV files",
      icon: Database,
      href: "/connect",
      color: "bg-blue-500",
    },
    {
      title: "Ask Questions",
      description: "Chat with your data using natural language",
      icon: MessageSquare,
      href: "/ask",
      color: "bg-green-500",
    },
    {
      title: "Build Datasets",
      description: "Create and prepare datasets with our visual studio",
      icon: Wrench,
      href: "/prep",
      color: "bg-purple-500",
    },
    {
      title: "View Dashboards",
      description: "Create and manage your analytics dashboards",
      icon: BarChart3,
      href: "/dashboards",
      color: "bg-orange-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome to DataAsk</h1>
          <p className="text-muted-foreground">Your AI-native business intelligence platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card key={action.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={action.href}>Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest queries and datasets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No recent activity. Start by connecting a data source or asking a question.
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
