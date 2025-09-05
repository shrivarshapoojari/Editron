import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from "@/modules/dashboard/actions";
import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";
import { Code2, Sparkles, Zap } from "lucide-react";
import React from "react";

const Page = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  console.log("Playgrounds:", playgrounds);
  
  return (
    <div className="relative z-10 flex flex-col justify-start items-center h-full mx-auto max-w-7xl px-4 py-10">
      {/* Header Section */}
      <div className="w-full mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Manage your coding playground projects</p>
          </div>
        </div>

      
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-cyan-400 font-semibold">Active Projects</p>
                  <p className="text-2xl font-bold text-white">{playgrounds?.length || 0}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-purple-400 font-semibold">Templates Used</p>
                  <p className="text-2xl font-bold text-white">{new Set(playgrounds?.map(p => p.template)).size || 0}</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-semibold">Total Lines</p>
                  <p className="text-2xl font-bold text-white">∞</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
          <AddNewButton />
          <AddRepo />
        </div>

        {/* Projects Section */}
        <div className="w-full">
          {playgrounds && playgrounds.length === 0 ? (
            <EmptyState />
          ) : (
            <ProjectTable
              projects={playgrounds || []}
              onDeleteProject={deleteProjectById}
              onUpdateProject={editProjectById}
              onDuplicateProject={duplicateProjectById}
            />
          )}
        </div>
    </div>
  );
};

export default Page;
