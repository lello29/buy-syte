
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, CheckCircle, Ban, Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { getProductsByShopId } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shop } from '@/types';
import { toast } from 'sonner';

interface ShopsTableProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
  onToggleStatus?: (shopId: string, isActive: boolean) => void;
  onDeleteShop?: (shopId: string) => void;
  onApproveShop?: (shopId: string, isApproved: boolean) => void;
}

const ShopsTable: React.FC<ShopsTableProps> = ({ 
  shops, 
  onViewShop, 
  onEditShop,
  onToggleStatus,
  onDeleteShop,
  onApproveShop
}) => {
  const isMobile = useIsMobile();
  
  const handleApproveShop = (shopId: string, isCurrentlyApproved: boolean) => {
    if (onApproveShop) {
      onApproveShop(shopId, !isCurrentlyApproved);
      toast.success(`Negozio ${!isCurrentlyApproved ? 'approvato' : 'sospeso'} con successo`);
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Indirizzo</TableHead>
          <TableHead>Prodotti</TableHead>
          <TableHead>Crediti AI</TableHead>
          <TableHead>Ultimo aggiornamento</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell className="font-medium">{shop.name}</TableCell>
            <TableCell>{shop.address}</TableCell>
            <TableCell>{getProductsByShopId(shop.id).length}</TableCell>
            <TableCell>{shop.aiCredits}</TableCell>
            <TableCell>{new Date(shop.lastUpdated).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge variant={shop.isApproved === false ? "warning" : "success"}>
                {shop.isApproved === false ? "In attesa" : "Approvato"}
              </Badge>
              {shop.isActive !== undefined && (
                <Badge variant={shop.isActive ? "success" : "destructive"} className="ml-2">
                  {shop.isActive ? "Attivo" : "Inattivo"}
                </Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewShop(shop)}
                >
                  <Eye className="mr-1 h-4 w-4" /> {!isMobile && "Visualizza"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEditShop(shop)}
                >
                  <Pencil className="mr-1 h-4 w-4" /> {!isMobile && "Modifica"}
                </Button>
                {onToggleStatus && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onToggleStatus(shop.id, !(shop.isActive))}
                  >
                    <Ban className="mr-1 h-4 w-4" /> {!isMobile && (shop.isActive ? "Disattiva" : "Attiva")}
                  </Button>
                )}
                {onApproveShop && shop.isApproved === false && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleApproveShop(shop.id, false)}
                  >
                    <CheckCircle className="mr-1 h-4 w-4" /> {!isMobile && "Approva"}
                  </Button>
                )}
                {onDeleteShop && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      if (window.confirm('Sei sicuro di voler eliminare questo negozio?')) {
                        onDeleteShop(shop.id);
                      }
                    }}
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> {!isMobile && "Elimina"}
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShopsTable;
