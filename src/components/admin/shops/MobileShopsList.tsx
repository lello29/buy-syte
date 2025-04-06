
import React from 'react';
import { Button } from '@/components/ui/button';
import { Ban, Eye, Trash2, Store, Edit, MapPin, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Shop } from '@/types';

interface MobileShopsListProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
  onToggleStatus: (shopId: string, isActive: boolean) => void;
  onDeleteShop: (shopId: string) => void;
  onAddShop: () => void;
}

const MobileShopsList: React.FC<MobileShopsListProps> = ({ 
  shops, 
  onViewShop, 
  onEditShop, 
  onToggleStatus,
  onDeleteShop,
  onAddShop
}) => {
  const handleDelete = (shopId: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo negozio?')) {
      onDeleteShop(shopId);
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddShop}
      >
        <Store className="h-5 w-5 mr-2" />
        Aggiungi nuovo negozio
      </Button>
      
      <div className="space-y-1">
        {shops.map((shop) => (
          <div key={shop.id} className="border rounded-md overflow-hidden mb-4 bg-white">
            <div className="p-4">
              <div className="text-2xl font-bold">{shop.name}</div>
              
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
                <Badge variant={shop.isApproved ? "success" : "destructive"}>
                  {shop.isApproved ? "Approvato" : "In attesa"}
                </Badge>
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
                onClick={() => onToggleStatus(shop.id, !shop.isActive)}
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
