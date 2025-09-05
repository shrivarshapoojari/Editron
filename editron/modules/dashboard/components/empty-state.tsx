import { Code2, Sparkles } from 'lucide-react'
import React from 'react'

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 relative">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Icon */}
        <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
          <Code2 className="w-16 h-16 text-gray-400" />
        </div>
        
        {/* Content */}
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
            No Projects Yet
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Your coding journey starts here. Create your first playground and experience the power of AI-enhanced development.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
              <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">AI Completions</p>
                <p className="text-gray-400 text-sm">Smart code suggestions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50">
              <Code2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">Multiple Frameworks</p>
                <p className="text-gray-400 text-sm">React, Vue, Angular & more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyState