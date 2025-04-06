
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "../types";

interface CustomerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newCustomer: {
    name: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddCustomer: () => void;
}

const CustomerDialog: React.FC<CustomerDialogProps> = ({
  isOpen,
  onOpenChange,
  newCustomer,
  handleInputChange,
  handleAddCustomer,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Cliente</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli per creare un nuovo cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={newCustomer.name}
              onChange={handleInputChange}
              placeholder="Nome cliente"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={newCustomer.email}
              onChange={handleInputChange}
              placeholder="Email cliente"
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
          <Button onClick={handleAddCustomer}>Aggiungi Cliente</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDialog;
