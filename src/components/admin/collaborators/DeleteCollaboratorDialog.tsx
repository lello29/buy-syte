
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Collaborator } from "@/types";

export interface DeleteCollaboratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborator: Collaborator | null;
  onConfirmDelete: (collaboratorId: string) => void;
}

const DeleteCollaboratorDialog: React.FC<DeleteCollaboratorDialogProps> = ({
  open,
  onOpenChange,
  collaborator,
  onConfirmDelete,
}) => {
  if (!collaborator) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Conferma Eliminazione</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler eliminare questo collaboratore? Questa azione non può essere annullata.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm"><strong>Nome:</strong> {collaborator.name}</p>
            <p className="text-sm"><strong>Email:</strong> {collaborator.email}</p>
            <p className="text-sm"><strong>Area di Copertura:</strong> {collaborator.coverageArea}</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button 
              variant="destructive"
              onClick={() => onConfirmDelete(collaborator.id)}
            >
              Elimina Collaboratore
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCollaboratorDialog;
