import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2, Sparkles, Zap, Terminal, GitBranch } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative z-20 flex flex-col items-center justify-start min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-4 pt-32 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Code Intelligence</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent mb-6 tracking-tight">
          Code Beyond
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Imagination
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
          Experience the future of coding with <span className="text-cyan-400 font-semibold">Editron</span> - 
          where artificial intelligence meets exceptional developer experience
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300">
              Start Coding Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 px-8 py-6 text-lg font-semibold bg-transparent backdrop-blur-sm">
            <Terminal className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="group p-8 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Completions</h3>
            <p className="text-gray-400 leading-relaxed">
              AI-powered code suggestions that understand your context and accelerate your development workflow
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-400 leading-relaxed">
              Blazing fast performance with real-time collaboration and instant feedback for seamless coding
            </p>
          </div>

          <div className="group p-8 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 hover:border-green-500/30 transition-all duration-300 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Version Control</h3>
            <p className="text-gray-400 leading-relaxed">
              Seamless Git integration with visual diff tools and intelligent merge conflict resolution
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              50K+
            </div>
            <div className="text-gray-400">Developers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
              1M+
            </div>
            <div className="text-gray-400">Lines of Code</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
