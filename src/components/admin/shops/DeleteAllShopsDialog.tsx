
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';

interface DeleteAllShopsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteAll: () => void;
  isDeleting: boolean;
  shopsCount: number;
}

const DeleteAllShopsDialog: React.FC<DeleteAllShopsDialogProps> = ({
  open,
  onOpenChange,
  onDeleteAll,
  isDeleting,
  shopsCount
}) => {
  const handleDelete = () => {
    console.log("Delete all button clicked, executing onDeleteAll callback");
    onDeleteAll();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conferma eliminazione di tutti i negozi</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler eliminare <strong>tutti i {shopsCount} negozi</strong>? Questa azione non può essere annullata e rimuoverà definitivamente tutti i dati.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Annulla
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-2" />
            )}
            {isDeleting ? "Eliminando..." : "Elimina Tutti i Negozi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAllShopsDialog;
