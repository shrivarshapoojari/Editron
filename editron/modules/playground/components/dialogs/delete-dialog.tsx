import * as React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"

interface DeleteDialogProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  title?: string
  description?: string
  itemName?: string
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
}

export function DeleteDialog({
  isOpen,
  setIsOpen,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  itemName,
  onConfirm,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
}: DeleteDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-gradient-to-b from-gray-950 to-gray-900 border-red-500/30 text-gray-100 shadow-2xl shadow-red-500/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-red-400">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            {description.replace("{item}", `"${itemName}"`)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="bg-gray-800/50 border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-gray-100 hover:border-gray-500/50 transition-all">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 transition-all shadow-lg shadow-red-500/20"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
