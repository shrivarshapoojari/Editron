"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";
import type { Project } from "../types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  ExternalLink,
  Copy,
  Download,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { MarkedToggleButton } from "./marked-toggle";

interface ProjectTableProps {
  projects: Project[];
  onUpdateProject?: (
    id: string,
    data: { title: string; description: string }
  ) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
  onDuplicateProject?: (id: string) => Promise<void>;
  
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,

}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editData, setEditData] = useState<EditProjectData>({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
 

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setEditData({
      title: project.title,
      description: project.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (project: Project) => {
    setSelectedProject(project);

    setDeleteDialogOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) return;

    setIsLoading(true);

    try {
      await onUpdateProject(selectedProject.id, editData);
      setEditDialogOpen(false);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error("Failed to update project");
      console.error("Error updating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkasFavorite = async (project: Project) => {
    //    Write your logic here
  };

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) return;

    setIsLoading(true);
    try {
      await onDeleteProject(selectedProject.id);
      setDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Error deleting project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDuplicateProject = async (project: Project) => {
    if (!onDuplicateProject) return;

    setIsLoading(true);
    try {
      await onDuplicateProject(project.id);
      toast.success("Project duplicated successfully");
    } catch (error) {
      toast.error("Failed to duplicate project");
      console.error("Error duplicating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyProjectUrl = (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`;
    navigator.clipboard.writeText(url);
    toast.success("Project url copied to clipboard");
  };

  return (
    <>
      {/* Modern Project Cards */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Your Projects
            </h2>
            <p className="text-gray-400 mt-1">
              {projects.length} project{projects.length !== 1 ? 's' : ''} in your workspace
            </p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex items-center justify-between">
                {/* Project Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    {/* Project Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-sm" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/playground/${project.id}`}
                            className="group/link inline-block"
                          >
                            <h3 className="font-semibold text-lg text-white group-hover/link:text-cyan-400 transition-colors duration-200 truncate">
                              {project.title}
                            </h3>
                          </Link>
                          
                          {project.description && (
                            <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                              {project.description}
                            </p>
                          )}

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 mt-3">
                            {/* Template Badge */}
                            <div className="flex items-center gap-2">
                              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 hover:border-purple-400/50 transition-colors">
                                {project.template}
                              </Badge>
                            </div>

                            {/* Created Date */}
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <div className="w-1 h-1 bg-gray-500 rounded-full" />
                              {format(new Date(project.createdAt), "MMM dd, yyyy")}
                            </span>

                            {/* User Info */}
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-gray-600 flex-shrink-0">
                                <Image
                                  src={project.user.image || "/placeholder.svg"}
                                  alt={project.user.name}
                                  width={20}
                                  height={20}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <span className="text-xs text-gray-400 truncate max-w-[100px]">
                                {project.user.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Quick Open Button */}
                          <Link
                            href={`/playground/${project.id}`}
                            className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-200 group/btn"
                          >
                            <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </Link>

                          {/* More Actions Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                              align="end" 
                              className="w-48 bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl"
                            >
                              <DropdownMenuItem asChild>
                                <MarkedToggleButton markedForRevision={project.Starmark[0]?.isMarked} id={project.id} />
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/playground/${project.id}`}
                                  className="flex items-center text-gray-300 hover:text-white"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Open Project
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/playground/${project.id}`}
                                  target="_blank"
                                  className="flex items-center text-gray-300 hover:text-white"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open in New Tab
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-700/50" />
                              <DropdownMenuItem
                                onClick={() => handleEditClick(project)}
                                className="text-gray-300 hover:text-white"
                              >
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicateProject(project)}
                                className="text-gray-300 hover:text-white"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => copyProjectUrl(project.id)}
                                className="text-gray-300 hover:text-white"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-gray-700/50" />
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(project)}
                                className="text-red-400 hover:text-red-300 focus:text-red-300"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Project
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Project</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to your project details here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter project title"
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter project description"
                rows={3}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-500 focus:border-cyan-500/50 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpdateProject}
              disabled={isLoading || !editData.title.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Project</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete "{selectedProject?.title}"? This
              action cannot be undone. All files and data associated with this
              project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              disabled={isLoading}
              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-none"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
