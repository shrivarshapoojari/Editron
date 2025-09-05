"use client";

import * as React from "react";
import {
  ChevronRight,
  File,
  Folder,
  Plus,
  FilePlus,
  FolderPlus,
  MoreHorizontal,
  Trash2,
  Edit3,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import RenameFolderDialog from "./dialogs/rename-folder-dialog";
import NewFolderDialog from "./dialogs/new-folder-dialog";
import NewFileDialog from "./dialogs/new-file-dialog";
import RenameFileDialog from "./dialogs/rename-file-dialog";
import { DeleteDialog } from "./dialogs/delete-dialog";

interface TemplateFile {
  filename: string;
  fileExtension: string;
  content: string;
}


interface TemplateFolder {
  folderName: string;
  items: (TemplateFile | TemplateFolder)[];
}

type TemplateItem = TemplateFile | TemplateFolder;

interface TemplateFileTreeProps {
  data: TemplateItem;
  onFileSelect?: (file: TemplateFile) => void;
  selectedFile?: TemplateFile;
  title?: string;
  onAddFile?: (file: TemplateFile, parentPath: string) => void;
  onAddFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onRenameFile?: (
    file: TemplateFile,
    newFilename: string,
    newExtension: string,
    parentPath: string
  ) => void;
  onRenameFolder?: (
    folder: TemplateFolder,
    newFolderName: string,
    parentPath: string
  ) => void;
}

export function TemplateFileTree({
  data,
  onFileSelect,
  selectedFile,
  title = "Files Explorer",
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  onRenameFile,
  onRenameFolder,
}: TemplateFileTreeProps) {
  const isRootFolder = data && typeof data === "object" && "folderName" in data;
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = React.useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] =
    React.useState(false);

  // Add simple style overrides
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      [data-sidebar="sidebar"] {
        background: linear-gradient(to bottom, rgb(3 7 18), rgb(17 24 39)) !important;
      }
      [data-sidebar="content"],
      [data-sidebar="group"],
      [data-sidebar="menu"] {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleAddRootFile = () => {
    setIsNewFileDialogOpen(true);
  };

  const handleAddRootFolder = () => {
    setIsNewFolderDialogOpen(true);
  };

  const handleCreateFile = (filename: string, extension: string) => {
    if (onAddFile && isRootFolder) {
      const newFile: TemplateFile = {
        filename,
        fileExtension: extension,
        content: "",
      };
      onAddFile(newFile, "");
    }
    setIsNewFileDialogOpen(false);
  };

  const handleCreateFolder = (folderName: string) => {
    if (onAddFolder && isRootFolder) {
      const newFolder: TemplateFolder = {
        folderName,
        items: [],
      };
      onAddFolder(newFolder, "");
    }
    setIsNewFolderDialogOpen(false);
  };

  return (
    <Sidebar 
      className="bg-gradient-to-b from-gray-950 to-gray-900 border-r border-cyan-500/20 shadow-lg"
      style={{ 
        background: 'linear-gradient(to bottom, rgb(3 7 18), rgb(17 24 39))',
        '--sidebar-background': 'transparent',
        '--sidebar-foreground': 'hsl(210 40% 98%)',
        '--sidebar-primary': 'hsl(210 40% 98%)',
        '--sidebar-primary-foreground': 'hsl(222.2 84% 4.9%)',
        '--sidebar-accent': 'hsl(210 40% 96%)',
        '--sidebar-accent-foreground': 'hsl(222.2 47.4% 11.2%)',
        '--sidebar-border': 'hsl(217.2 32.6% 17.5%)',
        '--sidebar-ring': 'hsl(212 72% 59%)',
      } as React.CSSProperties}
    >
      <SidebarContent className="bg-transparent">
        <SidebarGroup className="bg-transparent">
          <SidebarGroupLabel className="font-semibold text-sm bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent px-2 py-1">{title}</SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarGroupAction className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all rounded-lg border border-transparent hover:border-cyan-500/30">
                <Plus className="h-4 w-4" />
              </SidebarGroupAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="bg-gray-900/95 backdrop-blur-xl border-cyan-500/30 shadow-2xl shadow-cyan-500/10"
            >
              <DropdownMenuItem 
                onClick={handleAddRootFile}
                className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
              >
                <FilePlus className="h-4 w-4 mr-2" />
                New File
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleAddRootFolder}
                className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
              >
                <FolderPlus className="h-4 w-4 mr-2" />
                New Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <SidebarGroupContent className="bg-transparent">
            <SidebarMenu className="bg-transparent space-y-1">
              {isRootFolder ? (
                (data as TemplateFolder).items.map((child, index) => (
                  <TemplateNode
                    key={index}
                    item={child}
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                    level={0}
                    path=""
                    onAddFile={onAddFile}
                    onAddFolder={onAddFolder}
                    onDeleteFile={onDeleteFile}
                    onDeleteFolder={onDeleteFolder}
                    onRenameFile={onRenameFile}
                    onRenameFolder={onRenameFolder}
                  />
                ))
              ) : (
                <TemplateNode
                  item={data}
                  onFileSelect={onFileSelect}
                  selectedFile={selectedFile}
                  level={0}
                  path=""
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDeleteFile={onDeleteFile}
                  onDeleteFolder={onDeleteFolder}
                  onRenameFile={onRenameFile}
                  onRenameFolder={onRenameFolder}
                />
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail className="bg-cyan-500/10 border-l border-cyan-500/20" />

      <NewFileDialog
        isOpen={isNewFileDialogOpen}
        onClose={() => setIsNewFileDialogOpen(false)}
        onCreateFile={handleCreateFile}
      />

      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onClose={() => setIsNewFolderDialogOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </Sidebar>
  );
}

interface TemplateNodeProps {
  item: TemplateItem;
  onFileSelect?: (file: TemplateFile) => void;
  selectedFile?: TemplateFile;
  level: number;
  path?: string;
  onAddFile?: (file: TemplateFile, parentPath: string) => void;
  onAddFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onDeleteFile?: (file: TemplateFile, parentPath: string) => void;
  onDeleteFolder?: (folder: TemplateFolder, parentPath: string) => void;
  onRenameFile?: (
    file: TemplateFile,
    newFilename: string,
    newExtension: string,
    parentPath: string
  ) => void;
  onRenameFolder?: (
    folder: TemplateFolder,
    newFolderName: string,
    parentPath: string
  ) => void;
}

function TemplateNode({
  item,
  onFileSelect,
  selectedFile,
  level,
  path = "",
  onAddFile,
  onAddFolder,
  onDeleteFile,
  onDeleteFolder,
  onRenameFile,
  onRenameFolder,
}: TemplateNodeProps) {
  const isValidItem = item && typeof item === "object";
  const isFolder = isValidItem && "folderName" in item;
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = React.useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] =
    React.useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(level < 2);

  if (!isValidItem) return null;

  if (!isFolder) {
    const file = item as TemplateFile;
    const fileName = `${file.filename}.${file.fileExtension}`;

    const isSelected =
      selectedFile &&
      selectedFile.filename === file.filename &&
      selectedFile.fileExtension === file.fileExtension;

    const handleRename = () => {
      setIsRenameDialogOpen(true);
    };

    const handleDelete = () => {
      setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
      onDeleteFile?.(file, path);
      setIsDeleteDialogOpen(false);
    };

    const handleRenameSubmit = (newFilename: string, newExtension: string) => {
      onRenameFile?.(file, newFilename, newExtension, path);
      setIsRenameDialogOpen(false);
    };

    return (
      <SidebarMenuItem className="bg-transparent">
        <div className="flex items-center group bg-transparent">
          <SidebarMenuButton
            isActive={isSelected}
            onClick={() => onFileSelect?.(file)}
            className={`flex-1 transition-colors duration-200 bg-transparent border-0 ${
              isSelected 
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10 rounded-lg" 
                : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 rounded-lg"
            }`}
          >
            <File className="h-4 w-4 mr-2 shrink-0" />
            <span>{fileName}</span>
          </SidebarMenuButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end"
              className="bg-gray-900/95 backdrop-blur-xl border-cyan-500/30 shadow-2xl shadow-cyan-500/10"
            >
              <DropdownMenuItem 
                onClick={handleRename}
                className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-cyan-500/20" />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <RenameFileDialog
          isOpen={isRenameDialogOpen}
          onClose={() => setIsRenameDialogOpen(false)}
          onRename={handleRenameSubmit}
          currentFilename={file.filename}
          currentExtension={file.fileExtension}
        />

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Delete File"
          description={`Are you sure you want to delete "${fileName}"? This action cannot be undone.`}
          itemName={fileName}
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      </SidebarMenuItem>
    );
  } else {
    const folder = item as TemplateFolder;
    const folderName = folder.folderName;
    const currentPath = path ? `${path}/${folderName}` : folderName;

    const handleAddFile = () => {
      setIsNewFileDialogOpen(true);
    };

    const handleAddFolder = () => {
      setIsNewFolderDialogOpen(true);
    };

    const handleRename = () => {
      setIsRenameDialogOpen(true);
    };

    const handleDelete = () => {
      setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
      onDeleteFolder?.(folder, path);
      setIsDeleteDialogOpen(false);
    };

    const handleCreateFile = (filename: string, extension: string) => {
      if (onAddFile) {
        const newFile: TemplateFile = {
          filename,
          fileExtension: extension,
          content: "",
        };
        onAddFile(newFile, currentPath);
      }
      setIsNewFileDialogOpen(false);
    };

    const handleCreateFolder = (folderName: string) => {
      if (onAddFolder) {
        const newFolder: TemplateFolder = {
          folderName,
          items: [],
        };
        onAddFolder(newFolder, currentPath);
      }
      setIsNewFolderDialogOpen(false);
    };

    const handleRenameSubmit = (newFolderName: string) => {
      onRenameFolder?.(folder, newFolderName, path);
      setIsRenameDialogOpen(false);
    };

    return (
      <SidebarMenuItem className="bg-transparent">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="group/collapsible [&[data-state=open]>div>button>svg:first-child]:rotate-90 bg-transparent"
        >
          <div className="flex items-center group bg-transparent">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex-1 text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 transition-all rounded-lg bg-transparent">
                <ChevronRight className="transition-transform text-gray-500" />
                <Folder className="h-4 w-4 mr-2 shrink-0 text-cyan-400" />
                <span>{folderName}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10"
                >
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="bg-gray-900/95 backdrop-blur-xl border-cyan-500/30 shadow-2xl shadow-cyan-500/10"
              >
                <DropdownMenuItem 
                  onClick={handleAddFile}
                  className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
                >
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleAddFolder}
                  className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-cyan-500/20" />
                <DropdownMenuItem 
                  onClick={handleRename}
                  className="text-gray-300 hover:text-cyan-300 hover:bg-cyan-500/10 focus:bg-cyan-500/10 focus:text-cyan-300"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-cyan-500/20" />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CollapsibleContent className="bg-transparent">
            <SidebarMenuSub className="bg-transparent ml-4 space-y-1">
              {folder.items.map((childItem, index) => (
                <TemplateNode
                  key={index}
                  item={childItem}
                  onFileSelect={onFileSelect}
                  selectedFile={selectedFile}
                  level={level + 1}
                  path={currentPath}
                  onAddFile={onAddFile}
                  onAddFolder={onAddFolder}
                  onDeleteFile={onDeleteFile}
                  onDeleteFolder={onDeleteFolder}
                  onRenameFile={onRenameFile}
                  onRenameFolder={onRenameFolder}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>

        <NewFileDialog
          isOpen={isNewFileDialogOpen}
          onClose={() => setIsNewFileDialogOpen(false)}
          onCreateFile={handleCreateFile}
        />

        <NewFolderDialog
          isOpen={isNewFolderDialogOpen}
          onClose={() => setIsNewFolderDialogOpen(false)}
          onCreateFolder={handleCreateFolder}
        />

        <RenameFolderDialog
          isOpen={isRenameDialogOpen}
          onClose={() => setIsRenameDialogOpen(false)}
          onRename={handleRenameSubmit}
          currentFolderName={folderName}
        />

        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setIsDeleteDialogOpen}
          onConfirm={confirmDelete}
          title="Delete Folder"
          description={`Are you sure you want to delete "${folderName}" and all its contents? This action cannot be undone.`}
          itemName={folderName}
          confirmLabel="Delete"
          cancelLabel="Cancel"
        />
      </SidebarMenuItem>
    );
  }
}
