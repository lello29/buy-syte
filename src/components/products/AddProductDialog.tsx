
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import AddProductForm from "./AddProductForm";

interface AddProductDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ 
  trigger, 
  open, 
  onOpenChange 
}) => {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  // Use either controlled or uncontrolled state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Prodotto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        className={`${isMobile ? 'max-w-[98vw] p-3' : 'max-w-5xl'} h-[90vh] overflow-y-auto`}
      >
        <DialogHeader className="mb-2">
          <DialogTitle>Aggiungi nuovo prodotto</DialogTitle>
          {!isMobile && (
            <DialogDescription>
              Inserisci un nuovo prodotto nel tuo catalogo con un processo guidato
            </DialogDescription>
          )}
        </DialogHeader>
        <AddProductForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
