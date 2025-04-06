
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
import { Trash2 } from 'lucide-react';

interface DeleteShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

const DeleteShopDialog: React.FC<DeleteShopDialogProps> = ({
  open,
  onOpenChange,
  onDelete
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Conferma eliminazione</DialogTitle>
          <DialogDescription>
            Sei sicuro di voler eliminare questo negozio? Questa azione non può essere annullata.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Elimina
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteShopDialog;
