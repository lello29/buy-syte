
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Store, Trash2, Eye } from 'lucide-react';
import { Shop } from '@/types';
import { getProductsByShopId } from '@/data/mockData';

interface ShopsListTableProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onToggleApproval: (shop: Shop) => void;
  onDeleteShop: (shopId: string) => void;
}

const ShopsListTable: React.FC<ShopsListTableProps> = ({
  shops,
  onViewShop,
  onToggleApproval,
  onDeleteShop
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-3 font-medium">Nome</th>
                <th className="text-left p-3 font-medium">Email</th>
                <th className="text-left p-3 font-medium">Prodotti</th>
                <th className="text-center p-3 font-medium">Stato</th>
                <th className="text-right p-3 font-medium">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {shops.map((shop) => {
                const productCount = getProductsByShopId(shop.id).length;
                return (
                  <tr key={shop.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {shop.logoImage ? (
                          <img 
                            src={shop.logoImage} 
                            alt={shop.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <Store className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{shop.name}</p>
                          <p className="text-xs text-gray-500">
                            ID: {shop.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{shop.email}</td>
                    <td className="p-3">{productCount}</td>
                    <td className="p-3 text-center">
                      <Badge 
                        variant={shop.isApproved ? "success" : "secondary"}
                        className={shop.isApproved 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {shop.isApproved ? "Approvato" : "In attesa"}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => onViewShop(shop)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => onToggleApproval(shop)}
                        >
                          {shop.isApproved ? (
                            <X className="w-4 h-4 text-red-500" />
                          ) : (
                            <Check className="w-4 h-4 text-green-500" />
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => onDeleteShop(shop.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {shops.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    Nessun negozio trovato
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopsListTable;
