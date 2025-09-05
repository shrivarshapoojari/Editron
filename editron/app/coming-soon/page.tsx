import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Github, GitBranch, Star, Zap } from "lucide-react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-16">
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              className="bg-gray-800/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/50 transition-all backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center pt-8">
          {/* Main Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/25 animate-pulse">
              <Github className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Clock className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>Feature in Development</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent">
              GitHub Integration
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            We're crafting an amazing GitHub integration experience that will revolutionize how you import and manage your repositories in <span className="text-cyan-400 font-semibold">Editron</span>
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4 mx-auto">
                <Github className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">One-Click Import</h3>
              <p className="text-gray-400 text-sm">
                Import any GitHub repository with a single click
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 mx-auto">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Branch Management</h3>
              <p className="text-gray-400 text-sm">
                Work with multiple branches seamlessly
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Sync</h3>
              <p className="text-gray-400 text-sm">
                Real-time synchronization with your repos
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-gray-400">Development Progress</span>
            </div>
            <div className="w-full max-w-md mx-auto bg-gray-800/50 rounded-full h-3 backdrop-blur-sm border border-gray-700/50">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full relative overflow-hidden" style={{ width: '75%' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-purple-400 font-semibold">75% Complete</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                Explore Other Features
              </Button>
            </Link>
            
          </div>

          {/* Footer Message */}
          <div className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              We're working hard to bring you the best GitHub integration experience. 
              This feature will be available soon with enhanced security, performance, and ease of use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
