"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Database, MoreHorizontal } from "lucide-react"
import { clsx } from "clsx"

export default function ConnectPage() {
  const connections = [
    { id: "1", name: "Production Postgres", type: "PostgreSQL", status: "Connected" as const },
    { id: "2", name: "Marketing Leads CSV", type: "CSV", status: "Syncing..." as const },
    { id: "3", name: "Analytics Warehouse", type: "BigQuery", status: "Error" as const },
    { id: "4", name: "Customer Data", type: "MySQL", status: "Connected" as const },
    { id: "5", name: "Sales Reports", type: "Excel", status: "Syncing..." as const },
  ]

  const getStatusBadgeClass = (status: string) =>
    clsx({
      "bg-green-500/20 text-green-400 border-green-500/30": status === "Connected",
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30": status === "Syncing...",
      "bg-red-500/20 text-red-400 border-red-500/30": status === "Error",
    })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Data Connections</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Connection
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => (
            <Card key={connection.id} className="bg-zinc-900/50 border-zinc-800 hover:border-blue-500/50 transition-colors duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-zinc-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{connection.name}</CardTitle>
                      <CardDescription className="text-zinc-400">{connection.type}</CardDescription>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem className="text-zinc-300 hover:text-white hover:bg-zinc-800">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <Badge variant="outline" className={getStatusBadgeClass(connection.status)}>
                  {connection.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}


