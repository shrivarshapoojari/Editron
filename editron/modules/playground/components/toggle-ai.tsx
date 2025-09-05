"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Code, 
  FileText, 
  Import, 
  Loader2,
  Power,
  PowerOff,
  Braces,
  Variable
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { AIChatSidePanel } from "@/modules/ai-chat/components/ai-chat-sidebarpanel";



interface ToggleAIProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  
  suggestionLoading: boolean;
  loadingProgress?: number;
  activeFeature?: string;
}

const ToggleAI: React.FC<ToggleAIProps> = ({
  isEnabled,
  onToggle,

  suggestionLoading,
  loadingProgress = 0,
  activeFeature,
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            variant={isEnabled ? "default" : "outline"}
            className={cn(
              "relative gap-2 h-8 px-3 text-sm font-medium transition-all duration-200",
              isEnabled 
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-cyan-500 shadow-lg shadow-cyan-500/20" 
                : "bg-gray-800/50 hover:bg-cyan-500/10 text-gray-400 hover:text-cyan-400 border-cyan-500/30 hover:border-cyan-400/50",
              suggestionLoading && "opacity-75"
            )}
            onClick={(e) => e.preventDefault()}
          >
            {suggestionLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
            <span>AI</span>
            {isEnabled ? (
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            ) : (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 bg-gray-900/95 backdrop-blur-xl border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
          <DropdownMenuLabel className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">AI Assistant</span>
            </div>
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                isEnabled 
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-500" 
                  : "bg-gray-800/50 text-gray-400 border-gray-600/50"
              )}
            >
              {isEnabled ? "Active" : "Inactive"}
            </Badge>
          </DropdownMenuLabel>
          
          {suggestionLoading && activeFeature && (
            <div className="px-3 pb-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{activeFeature}</span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
                <Progress 
                  value={loadingProgress} 
                  className="h-1.5 bg-gray-800/50"
                />
              </div>
            </div>
          )}
          
          <DropdownMenuSeparator className="bg-cyan-500/20" />
          
          <DropdownMenuItem 
            onClick={() => onToggle(!isEnabled)}
            className="py-2.5 cursor-pointer text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {isEnabled ? (
                  <Power className="h-4 w-4 text-cyan-400" />
                ) : (
                  <PowerOff className="h-4 w-4 text-gray-400" />
                )}
                <div>
                  <div className="text-sm font-medium">
                    {isEnabled ? "Disable" : "Enable"} AI
                  </div>
                  <div className="text-xs text-gray-500">
                    Toggle AI assistance
                  </div>
                </div>
              </div>
              <div className={cn(
                "w-8 h-4 rounded-full border transition-all duration-200 relative",
                isEnabled 
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500" 
                  : "bg-gray-800/50 border-gray-600/50"
              )}>
                <div className={cn(
                  "w-3 h-3 rounded-full bg-white transition-all duration-200 absolute top-0.5",
                  isEnabled ? "left-4" : "left-0.5"
                )} />
              </div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-cyan-500/20" />
          
          <DropdownMenuItem 
            onClick={() => setIsChatOpen(true)}
            className="py-2.5 cursor-pointer text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
          >
            <div className="flex items-center gap-3 w-full">
              <FileText className="h-4 w-4 text-cyan-400" />
              <div>
                <div className="text-sm font-medium">Open Chat</div>
                <div className="text-xs text-gray-500">
                  Chat with AI assistant
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

<AIChatSidePanel
isOpen={isChatOpen}
onClose={() => setIsChatOpen(false)}

/>
    </>
  );
};

export default ToggleAI;
