
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface CustomerHeaderProps {
  onAddClick: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({ onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">I tuoi Clienti</h1>
        <p className="text-gray-600">
          Gestisci i clienti del tuo negozio e le loro informazioni.
        </p>
      </div>
      <Button onClick={onAddClick}>
        <UserPlus className="mr-2 h-5 w-5" /> Aggiungi Cliente
      </Button>
    </div>
  );
};

export default CustomerHeader;
