
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
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

interface ShopsTableProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
}

const ShopsTable: React.FC<ShopsTableProps> = ({ 
  shops, 
  onViewShop, 
  onEditShop 
}) => {
  const isMobile = useIsMobile();
  
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
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShopsTable;
