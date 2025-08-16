import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Settings, Bell, User, Search } from "lucide-react"

export default function StylePreviewPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">DataAsk Style Preview</h1>
          <p className="text-xl text-zinc-400">Vercel-inspired dark theme components</p>
        </div>

        {/* Typography */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Heading 1</h1>
            <h2 className="text-3xl font-semibold text-white">Heading 2</h2>
            <h3 className="text-2xl font-semibold text-white">Heading 3</h3>
            <p className="text-lg text-zinc-300">Large body text</p>
            <p className="text-base text-zinc-400">Regular body text</p>
            <p className="text-sm text-zinc-500">Small text</p>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
              <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white">
                Secondary
              </Button>
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white bg-transparent"
              >
                Outline
              </Button>
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                Ghost
              </Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Form Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search..."
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
            />
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search with icon..."
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges and Alerts */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Badges & Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Badge className="bg-blue-600">Primary</Badge>
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                Secondary
              </Badge>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                Outline
              </Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <Alert className="bg-zinc-800 border-zinc-700">
              <Bell className="h-4 w-4" />
              <AlertDescription className="text-zinc-300">This is an alert message in the dark theme.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Navigation Example */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="flex space-x-1 bg-zinc-800 p-1 rounded-xl">
              <Button variant="ghost" size="sm" className="bg-zinc-700 text-white">
                <Database className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="bg-zinc-900 border-zinc-800 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white">Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-black rounded-lg border border-zinc-800"></div>
                <p className="text-sm text-zinc-400">Black #000000</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-zinc-900 rounded-lg border border-zinc-800"></div>
                <p className="text-sm text-zinc-400">Zinc 900 #18181b</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-zinc-800 rounded-lg border border-zinc-700"></div>
                <p className="text-sm text-zinc-400">Zinc 800 #27272a</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-blue-600 rounded-lg"></div>
                <p className="text-sm text-zinc-400">Blue 600 #2563eb</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
