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

interface NewFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFile: (filename: string, extension: string) => void;
}

function NewFileDialog({ isOpen, onClose, onCreateFile }: NewFileDialogProps) {
  const [filename, setFilename] = React.useState("");
  const [extension, setExtension] = React.useState("js");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filename.trim()) {
      onCreateFile(filename.trim(), extension.trim() || "js");
      setFilename("");
      setExtension("js");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-gray-950 to-gray-900 border-cyan-500/30 text-gray-100 shadow-2xl shadow-cyan-500/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Create New File
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter a name for the new file and select its extension.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="filename" className="text-right text-gray-300">
                Filename
              </Label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="col-span-2 bg-gray-800/50 border-cyan-500/30 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 hover:border-cyan-500/50 transition-all"
                autoFocus
                placeholder="main"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="extension" className="text-right text-gray-300">
                Extension
              </Label>
              <Input
                id="extension"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                className="col-span-2 bg-gray-800/50 border-cyan-500/30 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 hover:border-cyan-500/50 transition-all"
                placeholder="js"
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
              disabled={!filename.trim()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NewFileDialog;   