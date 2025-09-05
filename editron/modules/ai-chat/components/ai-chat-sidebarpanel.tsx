"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
    Loader2,
    Send,
    User,
    Copy,

    X,

    Code,
    Sparkles,
    MessageSquare,
    RefreshCw,

    Settings,
    Zap,
    Brain,

    Search,
    Filter,
    Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
    TooltipProvider,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import "katex/dist/katex.min.css";
import Image from "next/image";
import Stream from "stream";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    id: string;
    timestamp: Date;
    type?: "chat" | "code_review" | "suggestion" | "error_fix" | "optimization";
    tokens?: number;
    model?: string;
}

interface AIChatSidePanelProps {
    isOpen: boolean;
    onClose: () => void;

}

const MessageTypeIndicator: React.FC<{
    type?: string;
    model?: string;
    tokens?: number;
}> = ({ type, model, tokens }) => {
    const getTypeConfig = (type?: string) => {
        switch (type) {
            case "code_review":
                return { icon: Code, color: "text-blue-400", label: "Code Review" };
            case "suggestion":
                return {
                    icon: Sparkles,
                    color: "text-purple-400",
                    label: "Suggestion",
                };
            case "error_fix":
                return { icon: RefreshCw, color: "text-red-400", label: "Error Fix" };
            case "optimization":
                return { icon: Zap, color: "text-yellow-400", label: "Optimization" };
            default:
                return { icon: MessageSquare, color: "text-zinc-400", label: "Chat" };
        }
    };

    const config = getTypeConfig(type);
    const Icon = config.icon;

    return (
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
                <Icon className={cn("h-3 w-3", config.color)} />
                <span className={cn("text-xs font-medium", config.color)}>
                    {config.label}
                </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
                {model && <span>{model}</span>}
                {tokens && <span>{tokens} tokens</span>}
            </div>
        </div>
    );
};

export const AIChatSidePanel: React.FC<AIChatSidePanelProps> = ({
    isOpen,
    onClose,

}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [chatMode, setChatMode] = useState<
        "chat" | "review" | "fix" | "optimize"
    >("chat");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState<string>("all");
    const [autoSave, setAutoSave] = useState(true);
    const [streamResponse, setStreamResponse] = useState(true);
    const [model, setModel] = useState<string>("gpt-6");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Prevent body scroll when panel is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            const originalDocumentOverflow = document.documentElement.style.overflow;
            
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            // Add global styles to ensure AI panel is above everything
            const style = document.createElement('style');
            style.id = 'ai-panel-zindex';
            style.textContent = `
                /* AI Panel - Portal rendered at document.body level */
                .ai-chat-panel {
                    z-index: 999999 !important;
                    position: fixed !important;
                    top: 0 !important;
                    right: 0 !important;
                    pointer-events: auto !important;
                }
                .ai-chat-backdrop {
                    z-index: 999998 !important;
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    pointer-events: auto !important;
                }
            `;
            document.head.appendChild(style);
            
            return () => {
                document.body.style.overflow = originalOverflow;
                document.documentElement.style.overflow = originalDocumentOverflow;
                const existingStyle = document.getElementById('ai-panel-zindex');
                if (existingStyle) {
                    document.head.removeChild(existingStyle);
                }
            };
        }
    }, [isOpen]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            scrollToBottom();
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [messages, isLoading]);

    const getChatModePrompt = (mode: string, content: string) => {
        switch (mode) {
            case "review":
                return `Please review this code and provide detailed suggestions for improvement, including performance, security, and best practices:\n\n**Request:** ${content}`;
            case "fix":
                return `Please help fix issues in this code, including bugs, errors, and potential problems:\n\n**Problem:** ${content}`;
            case "optimize":
                return `Please analyze this code for performance optimizations and suggest improvements:\n\n**Code to optimize:** ${content}`;
            default:
                return content
        }
    };

   const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageType =
      chatMode === "chat"
        ? "chat"
        : chatMode === "review"
        ? "code_review"
        : chatMode === "fix"
        ? "error_fix"
        : "optimization";

    const newMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
      id: Date.now().toString(),
      type: messageType,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const contextualMessage = getChatModePrompt(chatMode, input.trim());

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: contextualMessage,
          history: messages.slice(-10).map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          stream: streamResponse,
          mode: chatMode,
          model,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.response,
            timestamp: new Date(),
            id: Date.now().toString(),
            type: messageType,
            tokens: data.tokens,
            model: data.model || "AI Assistant",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I encountered an error while processing your request. Please try again.",
            timestamp: new Date(),
            id: Date.now().toString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please check your internet connection and try again.",
          timestamp: new Date(),
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

    const exportChat = () => {
         const chatData = {
      messages,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-chat-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    };

    const filteredMessages = messages
        .filter((msg) => {
            if (filterType === "all") return true;
            return msg.type === filterType
        })
        .filter((msg) => {
            if (!searchTerm) return true;
            return msg.content.toLowerCase().includes(searchTerm.toLowerCase())
        })

    return (
        <TooltipProvider>
            {isOpen && typeof window !== 'undefined' && createPortal(
                <>
                    {/* Backdrop */}
                    <div
                        className="ai-chat-backdrop fixed inset-0 bg-black/30 transition-opacity duration-300 opacity-100"
                        style={{ 
                            height: '100vh', 
                            width: '100vw',
                            zIndex: 999998,
                            position: 'fixed',
                            top: 0,
                            left: 0
                        }}
                        onClick={onClose}
                    />

                    {/* Side Panel */}
                    <div
                        className="ai-chat-panel fixed right-0 top-0 w-full max-w-2xl bg-gradient-to-b from-gray-950 to-gray-900 border-l border-cyan-500/20 flex flex-col transition-transform duration-300 ease-out shadow-2xl shadow-cyan-500/10 translate-x-0"
                        style={{ 
                            height: '100vh', 
                            minHeight: '100vh',
                            maxHeight: '100vh',
                            zIndex: 999999,
                            position: 'fixed',
                            top: 0,
                            right: 0
                        }}
                    >
                    {/* Enhanced Header */}
                    <div className="shrink-0 border-b border-cyan-500/20 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm">
                        <div className="flex items-center justify-between p-6">
                            <div className="flex items-center gap-3">
                               
                                <div>
                                    <h2 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        Editron AI
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {messages.length} messages
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuCheckboxItem
                                            checked={autoSave}
                                            onCheckedChange={setAutoSave}
                                        >
                                            Auto-save conversations
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem
                                            checked={streamResponse}
                                            onCheckedChange={setStreamResponse}
                                        >
                                            Stream responses
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={exportChat}>
                                            <Download className="h-4 w-4 mr-2" />
                                            Export Chat
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setMessages([])}>
                                            Clear All Messages
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClose}
                                    className="h-8 w-8 p-0 text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all rounded-lg"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Enhanced Controls */}
                        <Tabs
                            value={chatMode}
                            onValueChange={(value) => setChatMode(value as any)}
                            className="px-6"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-cyan-500/20">
                                    <TabsTrigger value="chat" className="flex items-center gap-1 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-400 hover:text-cyan-300">
                                        <MessageSquare className="h-3 w-3" />
                                        <span className="hidden sm:inline">Chat</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="review"
                                        className="flex items-center gap-1 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-400 hover:text-cyan-300"
                                    >
                                        <Code className="h-3 w-3" />
                                        <span className="hidden sm:inline">Review</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="fix" className="flex items-center gap-1 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-400 hover:text-cyan-300">
                                        <RefreshCw className="h-3 w-3" />
                                        <span className="hidden sm:inline">Fix</span>
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="optimize"
                                        className="flex items-center gap-1 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-400 hover:text-cyan-300"
                                    >
                                        <Zap className="h-3 w-3" />
                                        <span className="hidden sm:inline">Boost</span>
                                    </TabsTrigger>
                                </TabsList>

                                
                            </div>
                        </Tabs>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-950/50 to-gray-900/50 min-h-0">
                        <div className="h-full overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
                            {filteredMessages.length === 0 && !isLoading && (
                                <div className="text-center text-gray-400 py-16">
                                    <div className="relative w-16 h-16 border border-cyan-500/30 rounded-full flex flex-col justify-center items-center mx-auto mb-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                                        <Brain className="h-8 w-8 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        Editron AI Assistant
                                    </h3>
                                    <p className="text-gray-400 max-w-md mx-auto leading-relaxed mb-6">
                                        Advanced AI coding assistant with comprehensive analysis
                                        capabilities.
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
                                        {[
                                            "Review my React component for performance",
                                            "Fix TypeScript compilation errors",
                                            "Optimize database query performance",
                                            "Add comprehensive error handling",
                                            "Implement security best practices",
                                            "Refactor code for better maintainability",
                                        ].map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                onClick={() => setInput(suggestion)}
                                                className="px-3 py-2 bg-gray-800/50 hover:bg-cyan-500/10 border border-gray-600/50 hover:border-cyan-500/30 rounded-lg text-sm text-gray-300 hover:text-cyan-300 transition-all text-left"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {filteredMessages.map((msg) => (
                                <div key={msg.id} className="space-y-4">
                                    <div
                                        className={cn(
                                            "flex items-start gap-4 group",
                                            msg.role === "user" ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        {msg.role === "assistant" && (
                                            <div className="relative w-10 h-10 border rounded-full flex flex-col justify-center items-center">
                                                <Brain className="h-5 w-5 text-zinc-400" />
                                            </div>
                                        )}

                                        <div
                                            className={cn(
                                                "max-w-[85%] rounded-xl shadow-sm",
                                                msg.role === "user"
                                                    ? "bg-zinc-900/70 text-white p-4 rounded-br-md"
                                                    : "bg-zinc-900/80 backdrop-blur-sm text-zinc-100 p-5 rounded-bl-md border border-zinc-800/50"
                                            )}
                                        >
                                            {msg.role === "assistant" && (
                                                <MessageTypeIndicator
                                                    type={msg.type}
                                                    model={msg.model}
                                                    tokens={msg.tokens}
                                                />
                                            )}

                                            <div className="prose prose-invert prose-sm max-w-none">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm, remarkMath]}
                                                    rehypePlugins={[rehypeKatex]}
                                                    components={{ //@ts-ignore
                                                        code: ({ children, className, inline }) => {
                                                            if (inline) {
                                                                return (
                                                                    <code className="bg-zinc-800 px-1 py-0.5 rounded text-sm">
                                                                        {children}
                                                                    </code>
                                                                );
                                                            }
                                                            return (
                                                                <div className="bg-zinc-800 rounded-lg p-4 my-4">
                                                                    <pre className="text-sm text-zinc-100 overflow-x-auto">
                                                                        <code className={className}>{children}</code>
                                                                    </pre>
                                                                </div>
                                                            );
                                                        },
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>

                                            {/* Message actions */}
                                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-700/30">
                                                <div className="text-xs text-zinc-500">
                                                    {msg.timestamp.toLocaleTimeString()}
                                                </div>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            navigator.clipboard.writeText(msg.content)
                                                        }
                                                        className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200"
                                                    >
                                                        <Copy className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setInput(msg.content)}
                                                        className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-200"
                                                    >
                                                        <RefreshCw className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {msg.role === "user" && (
                                            <Avatar className="h-9 w-9 border border-zinc-700 bg-zinc-800 shrink-0">
                                                <AvatarFallback className="bg-zinc-700 text-zinc-300">
                                                    <User className="h-5 w-5" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-start gap-4 justify-start">
                                    <div className="relative w-10 h-10 border rounded-full flex flex-col justify-center items-center">
                                        <Brain className="h-5 w-5 text-zinc-400" />
                                    </div>
                                    <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 p-5 rounded-xl rounded-bl-md flex items-center gap-3">
                                        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                                        <span className="text-sm text-zinc-300">
                                            {chatMode === "review"
                                                ? "Analyzing code structure and patterns..."
                                                : chatMode === "fix"
                                                    ? "Identifying issues and solutions..."
                                                    : chatMode === "optimize"
                                                        ? "Analyzing performance bottlenecks..."
                                                        : "Processing your request..."}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} className="h-1" />
                        </div>
                    </div>

                    {/* Enhanced Input Form */}
                    <form
                        onSubmit={handleSendMessage}
                        className="shrink-0 p-4 border-t border-cyan-500/20 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
                    >
                        <div className="flex items-end gap-3">
                            <div className="flex-1 relative">
                                <Textarea
                                    placeholder={
                                        chatMode === "chat"
                                            ? "Ask about your code, request improvements, or paste code to analyze..."
                                            : chatMode === "review"
                                                ? "Describe what you'd like me to review in your code..."
                                                : chatMode === "fix"
                                                    ? "Describe the issue you're experiencing..."
                                                    : "Describe what you'd like me to optimize..."
                                    }
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                            handleSendMessage(e as any);
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="min-h-[44px] max-h-32 bg-gray-800/50 border-gray-600/50 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 hover:border-cyan-500/30 transition-all resize-none pr-20"
                                    rows={1}
                                />
                                <div className="absolute right-3 bottom-3 flex items-center gap-2">
                                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-gray-400 bg-gray-800/50 border border-gray-600/50 rounded">
                                        ⌘↵
                                    </kbd>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="h-11 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Send className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                </>,
                document.body
            )}
        </TooltipProvider>
    );
};