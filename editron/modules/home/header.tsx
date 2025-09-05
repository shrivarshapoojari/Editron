import Link from "next/link";
import UserButton from "../auth/components/user-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Code2 } from "lucide-react";

export function Header() {
  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50">
        <div className="bg-black/20 backdrop-blur-xl border-b border-gray-800/50 w-full">
          <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Editron
                </span>
              </Link>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <Link
                  href="/docs"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  Docs
                </Link>
                <Link
                  href="/features"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  Features
                </Link>
                <Link
                  href="/api"
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium flex items-center gap-2"
                >
                  API
                  <span className="text-cyan-400 border border-cyan-400/50 bg-cyan-400/10 rounded-lg px-2 py-1 text-xs font-semibold">
                    New
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side items */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <UserButton />
              </div>

              {/* Mobile Navigation */}
              <div className="flex md:hidden items-center gap-3">
                <ThemeToggle />
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
