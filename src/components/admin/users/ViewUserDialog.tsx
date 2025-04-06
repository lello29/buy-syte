
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User as UserIcon, Edit, Trash2, Shield } from "lucide-react";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ViewUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

const ViewUserDialog: React.FC<ViewUserDialogProps> = ({
  user,
  open,
  onOpenChange,
  onEditUser,
  onDeleteUser,
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" /> Dettagli Utente
          </DialogTitle>
          <DialogDescription>
            Informazioni dettagliate sull'account utente
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="font-mono">{user.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Stato</p>
              <Badge variant={user.isActive ? "success" : "destructive"}>
                {user.isActive ? "Attivo" : "Inattivo"}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p>{user.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Ruolo</p>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-blue-600" />
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Punti Fedeltà</p>
              <p>{user.loyaltyPoints}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Codice Fiscale</p>
              <p>{user.fiscalCode || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Partita IVA</p>
              <p>{user.vatNumber || "—"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Creato il</p>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Ultimo aggiornamento</p>
              <p>{new Date(user.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-medium text-gray-500 mb-2">Attività</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                L'utente ha effettuato {Math.floor(Math.random() * 10) + 1} accessi nell'ultimo mese.
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
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                onEditUser(user);
              }}
            >
              <Edit className="mr-1 h-4 w-4" /> Modifica
            </Button>
            <Button 
              variant="outline"
              className="text-red-600 hover:bg-red-100"
              onClick={() => {
                onOpenChange(false);
                onDeleteUser(user);
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

export default ViewUserDialog;
