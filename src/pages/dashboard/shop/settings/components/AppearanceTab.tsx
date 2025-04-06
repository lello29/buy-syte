
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Store, Upload, UploadCloud } from "lucide-react";

interface AppearanceTabProps {
  shop: {
    logoImage?: string;
    bannerImage?: string;
  };
  handleImageUpload: (type: 'logo' | 'banner') => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const AppearanceTab: React.FC<AppearanceTabProps> = ({
  shop,
  handleImageUpload,
  handleSubmit
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Logo</Label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden">
            {shop.logoImage ? (
              <img 
                src={shop.logoImage} 
                alt="Logo" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <Store className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <Button variant="outline" onClick={() => handleImageUpload('logo')}>
            <Upload className="mr-2 h-4 w-4" />
            Carica Logo
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Dimensione consigliata: 500x500 pixel. Formato: JPG, PNG.
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <Label>Immagine Banner</Label>
        <div className="space-y-4">
          <div className="aspect-[3/1] rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden">
            {shop.bannerImage ? (
              <img 
                src={shop.bannerImage} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <UploadCloud className="w-12 h-12 mb-2" />
                <span>Immagine Banner</span>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={() => handleImageUpload('banner')}>
            <Upload className="mr-2 h-4 w-4" />
            Carica Banner
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Dimensione consigliata: 1200x400 pixel. Formato: JPG, PNG.
        </p>
      </div>
      
      <Button onClick={handleSubmit}>Salva Modifiche</Button>
    </div>
  );
};

export default AppearanceTab;
