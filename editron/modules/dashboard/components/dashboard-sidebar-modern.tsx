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
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

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
    <Sidebar 
      variant="inset" 
      collapsible="icon" 
      className="border-r-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
      </div>

      <SidebarHeader className="relative z-10 border-b border-gray-800/50 bg-gray-950/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Editron
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Code Editor
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="relative z-10 bg-transparent">
        {/* Main Navigation */}
        <SidebarGroup className="px-4 py-6">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/"} 
                tooltip="Home" 
                className="group h-12 rounded-xl hover:bg-gray-800/30 data-[active=true]:bg-gradient-to-r data-[active=true]:from-cyan-500/20 data-[active=true]:to-blue-500/20 data-[active=true]:border data-[active=true]:border-cyan-500/30 data-[active=true]:text-cyan-400 transition-all duration-300"
              >
                <Link href="/">
                  <div className="w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 group-data-[active=true]:bg-cyan-500/20 flex items-center justify-center transition-colors duration-300">
                    <Home className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === "/dashboard"} 
                tooltip="Dashboard" 
                className="group h-12 rounded-xl hover:bg-gray-800/30 data-[active=true]:bg-gradient-to-r data-[active=true]:from-cyan-500/20 data-[active=true]:to-blue-500/20 data-[active=true]:border data-[active=true]:border-cyan-500/30 data-[active=true]:text-cyan-400 transition-all duration-300"
              >
                <Link href="/dashboard">
                  <div className="w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 group-data-[active=true]:bg-cyan-500/20 flex items-center justify-center transition-colors duration-300">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <span className="font-medium">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Starred Projects */}
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupLabel className="text-cyan-400 font-semibold text-sm mb-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Star className="h-3 w-3 text-cyan-400" />
            </div>
            Starred Projects
          </SidebarGroupLabel>
          <SidebarGroupAction title="Add starred playground" className="text-cyan-400 hover:text-cyan-300">
            <Plus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0 ? (
                <div className="text-center text-gray-500 py-6 px-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-800/30 mx-auto mb-3 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-sm">Create your first playground</p>
                </div>
              ) : (
                starredPlaygrounds.map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                        className="group h-10 rounded-lg hover:bg-gray-800/30 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-500/20 data-[active=true]:to-pink-500/20 data-[active=true]:border data-[active=true]:border-purple-500/30 data-[active=true]:text-purple-400 transition-all duration-300"
                      >
                        <Link href={`/playground/${playground.id}`}>
                          <div className="w-6 h-6 rounded-md bg-gray-800/50 group-hover:bg-gray-700/50 group-data-[active=true]:bg-purple-500/20 flex items-center justify-center transition-colors duration-300">
                            {IconComponent && <IconComponent className="h-3 w-3" />}
                          </div>
                          <span className="text-sm font-medium truncate">{playground.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        <SidebarGroup className="px-4 py-2">
          <SidebarGroupLabel className="text-purple-400 font-semibold text-sm mb-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <History className="h-3 w-3 text-purple-400" />
            </div>
            Recent Projects
          </SidebarGroupLabel>
          <SidebarGroupAction title="Create new playground" className="text-purple-400 hover:text-purple-300">
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {starredPlaygrounds.length === 0 && recentPlaygrounds.length === 0 ? null : (
                recentPlaygrounds.slice(0, 5).map((playground) => {
                  const IconComponent = lucideIconMap[playground.icon] || Code2;
                  return (
                    <SidebarMenuItem key={playground.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/playground/${playground.id}`}
                        tooltip={playground.name}
                        className="group h-10 rounded-lg hover:bg-gray-800/30 data-[active=true]:bg-gradient-to-r data-[active=true]:from-green-500/20 data-[active=true]:to-emerald-500/20 data-[active=true]:border data-[active=true]:border-green-500/30 data-[active=true]:text-green-400 transition-all duration-300"
                      >
                        <Link href={`/playground/${playground.id}`}>
                          <div className="w-6 h-6 rounded-md bg-gray-800/50 group-hover:bg-gray-700/50 group-data-[active=true]:bg-green-500/20 flex items-center justify-center transition-colors duration-300">
                            {IconComponent && <IconComponent className="h-3 w-3" />}
                          </div>
                          <span className="text-sm font-medium truncate">{playground.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })
              )}
              {recentPlaygrounds.length > 0 && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="View all" className="h-10 rounded-lg hover:bg-gray-800/30 transition-all duration-300">
                    <Link href="/playgrounds">
                      <div className="w-6 h-6 rounded-md bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-colors duration-300">
                        <FolderPlus className="h-3 w-3" />
                      </div>
                      <span className="text-sm text-gray-400">View all playgrounds</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="relative z-10 border-t border-gray-800/50 bg-gray-950/50 backdrop-blur-sm">
        <SidebarMenu className="px-4 py-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Settings" 
              className="group h-12 rounded-xl hover:bg-gray-800/30 transition-all duration-300"
            >
              <Link href="/settings">
                <div className="w-8 h-8 rounded-lg bg-gray-800/50 group-hover:bg-gray-700/50 flex items-center justify-center transition-colors duration-300">
                  <Settings className="h-4 w-4" />
                </div>
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
