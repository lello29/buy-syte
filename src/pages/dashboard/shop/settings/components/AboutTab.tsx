
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AboutTabProps {
  formData: {
    aboutUs: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const AboutTab: React.FC<AboutTabProps> = ({
  formData,
  handleInputChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="aboutUs">Il Nostro Negozio</Label>
        <Textarea 
          id="aboutUs" 
          name="aboutUs" 
          placeholder="Racconta la storia, la filosofia e i valori del tuo negozio..."
          rows={8}
          value={formData.aboutUs}
          onChange={handleInputChange}
        />
      </div>
      
      <Button type="submit">Salva Contenuto</Button>
    </form>
  );
};

export default AboutTab;
