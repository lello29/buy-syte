
import React from 'react';
import { Button } from '@/components/ui/button';
import { Ban, CheckCircle, Eye, Trash2, Store, Edit, MapPin, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Shop } from '@/types';
import { toast } from 'sonner';

interface MobileShopsListProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
  onToggleStatus: (shopId: string, isActive: boolean) => void;
  onDeleteShop: (shopId: string) => void;
  onAddShop: () => void;
  onApproveShop?: (shopId: string, isApproved: boolean) => void;
}

const MobileShopsList: React.FC<MobileShopsListProps> = ({ 
  shops, 
  onViewShop, 
  onEditShop, 
  onToggleStatus,
  onDeleteShop,
  onAddShop,
  onApproveShop
}) => {
  const handleDelete = (shopId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo negozio?')) {
      onDeleteShop(shopId);
    }
  };

  const handleToggleStatus = (shop: Shop) => {
    onToggleStatus(shop.id, !shop.isActive);
    toast.success(`Negozio ${!shop.isActive ? 'attivato' : 'disattivato'} con successo`);
  };
  
  const handleApproveShop = (shopId: string) => {
    if (onApproveShop) {
      onApproveShop(shopId, true);
      toast.success('Negozio approvato con successo');
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddShop}
      >
        <Store className="h-5 w-5 mr-2" />
        Aggiungi nuovo negozio
      </Button>
      
      <div className="space-y-4">
        {shops.map((shop) => (
          <div key={shop.id} className="border rounded-md overflow-hidden mb-4 bg-white shadow-sm">
            <div className="p-4">
              <div className="text-xl font-semibold">{shop.name}</div>
              
              <div className="text-sm text-gray-600 mt-1 capitalize">
                Categoria: {shop.category || 'Non specificata'}
              </div>
              
              <div className="flex items-center text-gray-800 mt-1">
                <MapPin className="h-4 w-4 mr-1 text-gray-500 flex-shrink-0" />
                <span className="line-clamp-1">{shop.address}</span>
              </div>
              
              <div className="flex items-center text-gray-800 mt-1">
                <Mail className="h-4 w-4 mr-1 text-gray-500" />
                {shop.email}
              </div>
              
              <div className="flex items-center text-gray-800 mt-1">
                <Phone className="h-4 w-4 mr-1 text-gray-500" />
                {shop.phone}
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {shop.isApproved !== undefined && (
                  <Badge variant={shop.isApproved ? "success" : "warning"}>
                    {shop.isApproved ? "Approvato" : "In attesa"}
                  </Badge>
                )}
                <Badge variant={shop.isActive ? "success" : "destructive"}>
                  {shop.isActive ? "Attivo" : "Inattivo"}
                </Badge>
                <Badge variant="outline">
                  Crediti AI: {shop.aiCredits || 0}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-gray-700 hover:bg-gray-100"
                onClick={() => handleToggleStatus(shop)}
              >
                <Ban className="h-5 w-5 mr-1" /> 
                {shop.isActive ? "Disattiva" : "Attiva"}
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-blue-700 hover:bg-blue-50"
                onClick={() => onViewShop(shop)}
              >
                <Eye className="h-5 w-5 mr-1" />
                Dettagli
              </Button>
              
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-green-700 hover:bg-green-50"
                onClick={() => onEditShop(shop)}
              >
                <Edit className="h-5 w-5 mr-1" />
                Modifica
              </Button>
              
              {shop.isApproved === false && onApproveShop && (
                <Button 
                  variant="ghost" 
                  className="flex-1 rounded-none h-12 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => handleApproveShop(shop.id)}
                >
                  <CheckCircle className="h-5 w-5 mr-1" />
                  Approva
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-red-600 hover:bg-red-50"
                onClick={() => handleDelete(shop.id)}
              >
                <Trash2 className="h-5 w-5 mr-1" />
                Elimina
              </Button>
            </div>
          </div>
        ))}
        
        {shops.length === 0 && (
          <div className="text-center py-8 bg-white rounded-lg border">
            <p className="text-gray-500 mb-4">Nessun negozio trovato.</p>
            <Button onClick={onAddShop} size="sm">
              <Store className="mr-2 h-4 w-4" />
              Aggiungi il primo negozio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileShopsList;
