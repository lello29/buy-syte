
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PenLine, Store } from 'lucide-react';
import { Shop } from '@/types';

interface ShopDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedShop: Shop | null;
  onEditClick?: () => void;
}

const ShopDetailsDialog: React.FC<ShopDetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedShop,
  onEditClick
}) => {
  if (!selectedShop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dettagli Negozio</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {selectedShop.bannerImage && (
            <div className="h-40 rounded-md overflow-hidden">
              <img 
                src={selectedShop.bannerImage} 
                alt={`${selectedShop.name} banner`} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex gap-4 items-center">
            {selectedShop.logoImage ? (
              <img 
                src={selectedShop.logoImage} 
                alt={selectedShop.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Store className="w-8 h-8 text-gray-500" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold">{selectedShop.name}</h2>
              <p className="text-gray-500">{selectedShop.email}</p>
            </div>
            <div className="ml-auto">
              <Badge variant={selectedShop.isApproved ? "success" : "secondary"}>
                {selectedShop.isApproved ? "Approvato" : "In attesa"}
              </Badge>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Indirizzo</Label>
              <p className="text-sm">{selectedShop.address}</p>
            </div>
            <div className="space-y-2">
              <Label>Telefono</Label>
              <p className="text-sm">{selectedShop.phone}</p>
            </div>
            <div className="space-y-2">
              <Label>Crediti AI</Label>
              <p className="text-sm">{selectedShop.aiCredits}</p>
            </div>
            <div className="space-y-2">
              <Label>Data Creazione</Label>
              <p className="text-sm">{new Date(selectedShop.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-2">
              <Label>Data Ultimo Aggiornamento</Label>
              <p className="text-sm">{new Date(selectedShop.lastUpdated).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrizione</Label>
            <p className="text-sm border p-3 rounded-md">{selectedShop.description}</p>
          </div>

          {selectedShop.aboutUs && (
            <div className="space-y-2">
              <Label>Chi Siamo</Label>
              <p className="text-sm border p-3 rounded-md">{selectedShop.aboutUs}</p>
            </div>
          )}

          {selectedShop.openingHours && (
            <div className="space-y-2">
              <Label>Orari di Apertura</Label>
              <p className="text-sm border p-3 rounded-md whitespace-pre-line">{selectedShop.openingHours}</p>
            </div>
          )}

          {selectedShop.categories && selectedShop.categories.length > 0 && (
            <div className="space-y-2">
              <Label>Categorie</Label>
              <div className="flex flex-wrap gap-2">
                {selectedShop.categories.map((category, index) => (
                  <Badge key={index} variant="outline">{category}</Badge>
                ))}
              </div>
            </div>
          )}

          {selectedShop.socialLinks && (
            <div className="space-y-2">
              <Label>Social Media</Label>
              <div className="flex gap-3">
                {selectedShop.socialLinks.facebook && (
                  <a href={selectedShop.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
                )}
                {selectedShop.socialLinks.instagram && (
                  <a href={selectedShop.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Instagram</a>
                )}
                {selectedShop.socialLinks.twitter && (
                  <a href={selectedShop.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Switch id="approved-status" checked={!!selectedShop.isApproved} />
              <Label htmlFor="approved-status">Approvato</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Chiudi
          </Button>
          {onEditClick && (
            <Button onClick={onEditClick}>
              <PenLine className="w-4 h-4 mr-2" />
              Modifica
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShopDetailsDialog;
