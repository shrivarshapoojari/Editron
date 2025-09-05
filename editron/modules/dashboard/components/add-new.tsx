
"use client";

import { Button } from "@/components/ui/button"
import { Plus, Sparkles } from 'lucide-react'
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";
import TemplateSelectingModal from "./template-selecting-modal";
import { createPlayground } from "../actions";

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedTemplate, setSelectedTemplate] = useState<{
    title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  } | null>(null)
  const router = useRouter()

  const handleSubmit = async (data:{
      title: string;
    template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
    description?: string;
  })=>{
    setSelectedTemplate(data)

    const res = await createPlayground(data);
    toast.success("Playground Created successfully")
    setIsModalOpen(false)
    router.push(`/playground/${res?.id}`)
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group px-8 py-8 flex flex-row justify-between items-center rounded-2xl 
        bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 
        cursor-pointer backdrop-blur-sm
        transition-all duration-300 ease-in-out
        hover:border-cyan-500/40 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20
        relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-row justify-center items-start gap-6">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
            <Plus size={24} className="text-white transition-transform duration-300 group-hover:rotate-90" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Create New
            </h1>
            <p className="text-gray-400 max-w-[250px] leading-relaxed">
              Start a new coding playground with AI-powered features
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">AI Enhanced</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Plus size={32} className="text-cyan-400" />
        </div>
      </div>
      <TemplateSelectingModal
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      onSubmit={handleSubmit}
      />
    </>
  )
}

export default AddNewButton
