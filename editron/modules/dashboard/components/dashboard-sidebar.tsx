"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  FlameIcon,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Define the interface for a single playground item, icon is now a string
interface PlaygroundData {
  id: string
  name: string
  icon: string // Changed to string
  starred: boolean
}

// Map icon names (strings) to their corresponding LucideIcon components
const lucideIconMap: Record<string, LucideIcon> = {
  Zap: Zap,
  Lightbulb: Lightbulb,
  Database: Database,
  Compass: Compass,
  FlameIcon: FlameIcon,
  Terminal: Terminal,
  Code2: Code2,
}

export function DashboardSidebar({ initialPlaygroundData }: { initialPlaygroundData: PlaygroundData[] }) {
  const pathname = usePathname()
  const [starredPlaygrounds, setStarredPlaygrounds] = useState(initialPlaygroundData.filter((p) => p.starred))
  const [recentPlaygrounds, setRecentPlaygrounds] = useState(initialPlaygroundData)

  return (
    <div className="w-80 h-screen bg-gradient-to-b from-gray-950 to-black border-r border-gray-800/30 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cyan-500/3 to-transparent" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/3 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_50%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/20">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Editron
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              AI Code Editor
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="relative z-10 flex-1 overflow-auto">
        {/* Main Navigation */}
        <div className="p-6 space-y-2">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">Navigation</div>
          
          <Link 
            href="/"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              pathname === "/" 
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10" 
                : "hover:bg-gray-800/40 text-gray-300 hover:text-white"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              pathname === "/" ? "bg-cyan-500/20" : "bg-gray-800/50 group-hover:bg-gray-700/50"
            )}>
              <Home className="w-4 h-4" />
            </div>
            <span className="font-medium">Home</span>
            {pathname === "/" && <ChevronRight className="w-4 h-4 ml-auto text-cyan-400" />}
          </Link>

          <Link 
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              pathname === "/dashboard" 
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10" 
                : "hover:bg-gray-800/40 text-gray-300 hover:text-white"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              pathname === "/dashboard" ? "bg-cyan-500/20" : "bg-gray-800/50 group-hover:bg-gray-700/50"
            )}>
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span className="font-medium">Dashboard</span>
            {pathname === "/dashboard" && <ChevronRight className="w-4 h-4 ml-auto text-cyan-400" />}
          </Link>
        </div>

        {/* Starred Projects */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-3 h-3 text-yellow-400" />
              </div>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Starred Projects</span>
            </div>
            <button className="w-6 h-6 rounded-md bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-yellow-400 hover:text-yellow-300 transition-colors">
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1">
            {starredPlaygrounds.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl bg-gray-800/30 mx-auto mb-3 flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">No starred projects yet</p>
                <p className="text-xs text-gray-600 mt-1">Star your favorites to see them here</p>
              </div>
            ) : (
              starredPlaygrounds.map((playground) => {
                const IconComponent = lucideIconMap[playground.icon] || Code2;
                const isActive = pathname === `/playground/${playground.id}`;
                return (
                  <Link
                    key={playground.id}
                    href={`/playground/${playground.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group",
                      isActive 
                        ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400" 
                        : "hover:bg-gray-800/40 text-gray-400 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                      isActive ? "bg-yellow-500/20" : "bg-gray-800/50 group-hover:bg-gray-700/50"
                    )}>
                      <IconComponent className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium truncate">{playground.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-yellow-400 ml-auto" />}
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-purple-500/20 flex items-center justify-center">
                <History className="w-3 h-3 text-purple-400" />
              </div>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Recent Projects</span>
            </div>
            <button className="w-6 h-6 rounded-md bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-purple-400 hover:text-purple-300 transition-colors">
              <FolderPlus className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-1">
            {recentPlaygrounds.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-10 h-10 rounded-xl bg-gray-800/30 mx-auto mb-2 flex items-center justify-center">
                  <History className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">No recent projects</p>
              </div>
            ) : (
              recentPlaygrounds.slice(0, 5).map((playground) => {
                const IconComponent = lucideIconMap[playground.icon] || Code2;
                const isActive = pathname === `/playground/${playground.id}`;
                return (
                  <Link
                    key={playground.id}
                    href={`/playground/${playground.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group",
                      isActive 
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400" 
                        : "hover:bg-gray-800/40 text-gray-400 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-md flex items-center justify-center transition-colors",
                      isActive ? "bg-purple-500/20" : "bg-gray-800/50 group-hover:bg-gray-700/50"
                    )}>
                      <IconComponent className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium truncate">{playground.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-purple-400 ml-auto" />}
                  </Link>
                );
              })
            )}
            {recentPlaygrounds.length > 5 && (
              <Link
                href="/playgrounds"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/40 text-gray-500 hover:text-gray-300 transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-md bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center">
                  <ChevronRight className="w-3 h-3" />
                </div>
                <span className="text-sm">View all projects</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 p-6 border-t border-gray-800/50">
        <button 
          onClick={() => toast.info("Personalisation Coming Soon!", {
            description: "We're working on amazing customization features for your dashboard. Stay tuned!",
            duration: 4000,
          })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/40 text-gray-400 hover:text-white transition-all duration-300 group w-full text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 flex items-center justify-center transition-colors">
            <Settings className="w-4 h-4" />
          </div>
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  )
}
