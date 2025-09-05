
import { Button } from "@/components/ui/button"
import { Github, GitBranch } from "lucide-react"
import Link from "next/link"

const AddRepo = () => {
  return (
    <Link href="/coming-soon" className="block">
      <div
        className="group px-8 py-8 flex flex-row justify-between items-center rounded-2xl 
        bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 
        cursor-pointer backdrop-blur-sm
        transition-all duration-300 ease-in-out
        hover:border-purple-500/40 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20
        relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-row justify-center items-start gap-6">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
            <Github size={24} className="text-white transition-transform duration-300 group-hover:translate-y-1" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Import Repository
            </h1>
            <p className="text-gray-400 max-w-[250px] leading-relaxed">
              Connect your GitHub repositories and edit them in the cloud
            </p>
            <div className="flex items-center gap-2 mt-3">
              <GitBranch className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">Git Integration</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Github size={32} className="text-purple-400" />
        </div>
      </div>
    </Link>
  )
}


export default AddRepo


