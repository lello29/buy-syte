
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collaborator } from "@/types";
import { User, UserX, UserCheck, Star, MapPin, Clock, Phone, Trash2 } from "lucide-react";

export interface ViewCollaboratorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collaborator: Collaborator | null;
  onToggleStatus: (collaboratorId: string, isActive: boolean) => void;
  onDelete: (collaborator: Collaborator) => void;
}

const ViewCollaboratorDialog: React.FC<ViewCollaboratorDialogProps> = ({
  open,
  onOpenChange,
  collaborator,
  onToggleStatus,
  onDelete,
}) => {
  if (!collaborator) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Dettagli Collaboratore
          </DialogTitle>
          <DialogDescription>
            Informazioni dettagliate sul collaboratore
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="font-mono">{collaborator.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Stato</p>
              <Badge variant={collaborator.isActive ? "success" : "destructive"}>
                {collaborator.isActive ? "Attivo" : "Inattivo"}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p>{collaborator.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{collaborator.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Telefono</p>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-gray-600" />
                <span>{collaborator.phone}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Valutazione</p>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                <span>{collaborator.rating.toFixed(1)} ({collaborator.completedTasks} incarichi completati)</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Area di Copertura</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-gray-600" />
                <span>{collaborator.coverageArea}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Disponibilità</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-600" />
                <span>{collaborator.availability}</span>
              </div>
            </div>
            <div className="space-y-1 col-span-2">
              <p className="text-sm font-medium text-gray-500">Data di registrazione</p>
              <p>{new Date(collaborator.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Statistiche</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Incarichi completati:</strong> {collaborator.completedTasks}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Valutazione media:</strong> {collaborator.rating.toFixed(1)} / 5
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Chiudi
            </Button>
            <Button 
              variant={collaborator.isActive ? "outline" : "default"}
              className={collaborator.isActive ? "text-red-600 hover:bg-red-100" : ""}
              onClick={() => {
                onToggleStatus(collaborator.id, !collaborator.isActive);
                onOpenChange(false);
              }}
            >
              {collaborator.isActive ? (
                <><UserX className="mr-1 h-4 w-4" /> Disattiva</>
              ) : (
                <><UserCheck className="mr-1 h-4 w-4" /> Attiva</>
              )}
            </Button>
            <Button 
              variant="outline"
              className="text-red-600 hover:bg-red-100"
              onClick={() => {
                onOpenChange(false);
                onDelete(collaborator);
              }}
            >
              <Trash2 className="mr-1 h-4 w-4" /> Elimina
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCollaboratorDialog;
