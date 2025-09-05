"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface RenameFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRename: (folderName: string) => void;
  currentFolderName: string;
}

function RenameFolderDialog({
  isOpen,
  onClose,
  onRename,
  currentFolderName,
}: RenameFolderDialogProps) {
  const [folderName, setFolderName] = React.useState(currentFolderName);

  React.useEffect(() => {
    if (isOpen) {
      setFolderName(currentFolderName);
    }
  }, [isOpen, currentFolderName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onRename(folderName.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-gray-950 to-gray-900 border-cyan-500/30 text-gray-100 shadow-2xl shadow-cyan-500/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Rename Folder
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter a new name for the folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="rename-foldername" className="text-right text-gray-300">
                Folder Name
              </Label>
              <Input
                id="rename-foldername"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="col-span-2 bg-gray-800/50 border-cyan-500/30 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 hover:border-cyan-500/50 transition-all"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-100 hover:border-gray-500/50 transition-all"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!folderName.trim()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RenameFolderDialog;
