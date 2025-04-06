
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AddProviderFormProps {
  onAddProvider: (name: string) => void;
}

export const AddProviderForm = ({ onAddProvider }: AddProviderFormProps) => {
  const [newProviderName, setNewProviderName] = useState("");

  const handleAddProvider = () => {
    if (newProviderName.trim() === "") {
      toast.error("Inserisci un nome per il provider AI");
      return;
    }
    
    onAddProvider(newProviderName);
    setNewProviderName("");
  };

  return (
    <div className="space-y-2">
      <Label>Aggiungi Nuovo Provider</Label>
      <div className="flex space-x-2">
        <Input
          value={newProviderName}
          onChange={(e) => setNewProviderName(e.target.value)}
          placeholder="Nome del provider"
          className="flex-grow"
        />
        <Button onClick={handleAddProvider}>
          <PlusCircle className="h-4 w-4 mr-1" /> Aggiungi
        </Button>
      </div>
    </div>
  );
};
