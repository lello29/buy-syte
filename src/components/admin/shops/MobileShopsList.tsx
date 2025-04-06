
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Plus, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Shop } from '@/types';
import { toast } from 'sonner';

interface MobileShopsListProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
  onAddShop: () => void;
}

const MobileShopsList: React.FC<MobileShopsListProps> = ({ 
  shops, 
  onViewShop, 
  onEditShop,
  onAddShop
}) => {
  return (
    <div className="space-y-4">
      <Button 
        className="w-full bg-[#0a3276] hover:bg-[#0a3276]/90 text-white font-bold py-3 rounded-md flex items-center justify-center"
        onClick={onAddShop}
      >
        <Plus className="h-5 w-5 mr-2" />
        Aggiungi nuovo negozio
      </Button>
      
      <div className="space-y-1">
        {shops.map((shop) => (
          <div key={shop.id} className="border rounded-md overflow-hidden mb-4 bg-white">
            <div className="p-4">
              <div className="text-2xl font-bold">{shop.name}</div>
              <div className="text-gray-800">{shop.address}</div>
              <div className="text-sm text-gray-500 mt-1">
                Ultimo aggiornamento: {new Date(shop.lastUpdated).toLocaleDateString()}
              </div>
              <div className="mt-2">
                <Badge variant={shop.isApproved === false ? "warning" : "success"}>
                  {shop.isApproved === false ? "In attesa" : "Approvato"}
                </Badge>
                <span className="text-sm ml-2">
                  Crediti AI: <span className="font-bold">{shop.aiCredits}</span>
                </span>
              </div>
            </div>
            <div className="flex border-t">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-gray-700 hover:bg-gray-100"
                onClick={() => onViewShop(shop)}
              >
                <Eye className="h-5 w-5 mr-1" /> 
                Visualizza
              </Button>
              <Button 
                variant="ghost" 
                className="flex-1 rounded-none h-12 text-blue-700 hover:bg-blue-50"
                onClick={() => onEditShop(shop)}
              >
                <Pencil className="h-5 w-5 mr-1" />
                Modifica
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileShopsList;
