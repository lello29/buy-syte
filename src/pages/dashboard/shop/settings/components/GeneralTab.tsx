
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GeneralTabProps {
  formData: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    websiteUrl: string;
    openingHours: string;
    categories: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  formData,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Negozio</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Telefono</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Sito Web</Label>
          <Input 
            id="websiteUrl" 
            name="websiteUrl" 
            placeholder="https://..." 
            value={formData.websiteUrl}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Indirizzo</Label>
        <Input 
          id="address" 
          name="address" 
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrizione Breve</Label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Breve descrizione del tuo negozio" 
          rows={2}
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="categories">Categorie</Label>
        <Input 
          id="categories" 
          name="categories" 
          placeholder="Separa le categorie con una virgola" 
          value={formData.categories}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          Esempio: Abbigliamento, Scarpe, Accessori
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="openingHours">Orari di Apertura</Label>
        <Textarea 
          id="openingHours" 
          name="openingHours" 
          placeholder="Lun-Ven: 9:00-18:00&#10;Sab: 9:00-13:00"
          rows={3}
          value={formData.openingHours}
          onChange={handleInputChange}
        />
        <p className="text-sm text-muted-foreground">
          Inserisci ogni fascia oraria su una nuova riga
        </p>
      </div>
      
      <Button type="submit">Salva Informazioni</Button>
    </form>
  );
};

export default GeneralTab;
