"use client"

import type React from "react"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Database, MessageSquare, Wrench, BarChart3, LogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Connect Data", href: "/connect", icon: Database },
  { name: "Ask Questions", href: "/ask", icon: MessageSquare },
  { name: "Data Prep", href: "/prep", icon: Wrench },
  { name: "Dashboards", href: "/dashboards", icon: BarChart3 },
  { name: "Datasets", href: "/datasets", icon: Database },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-6 border-b">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-xl">DataAsk</span>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                  onClick={() => mobile && setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut()}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4 px-6 py-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden bg-transparent" onClick={() => setSidebarOpen(true)}>
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}


