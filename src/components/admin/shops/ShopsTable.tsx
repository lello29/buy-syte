
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, CheckCircle, Ban, Trash2, User } from 'lucide-react';
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
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ShopsTableProps {
  shops: Shop[];
  onViewShop: (shop: Shop) => void;
  onEditShop: (shop: Shop) => void;
  onToggleStatus?: (shopId: string, isActive: boolean) => void;
  onDeleteShop?: (shopId: string) => void;
  onApproveShop?: (shopId: string, isApproved: boolean) => void;
  onViewUser?: (userId: string) => void;
}

const ShopsTable: React.FC<ShopsTableProps> = ({ 
  shops, 
  onViewShop, 
  onEditShop,
  onToggleStatus,
  onDeleteShop,
  onApproveShop,
  onViewUser
}) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleViewUser = (userId: string) => {
    if (userId) {
      if (onViewUser) {
        onViewUser(userId);
      } else {
        navigate(`/dashboard/admin/users?id=${userId}`);
      }
    } else {
      toast.error("Nessun utente associato a questo negozio");
    }
  };

  // Function to safely handle shop actions
  const safelyCallAction = (shop: Shop, action: (shop: Shop) => void) => {
    if (shop) {
      action(shop);
    } else {
      console.error("Cannot perform action on undefined shop");
      toast.error("Errore nell'esecuzione dell'azione");
    }
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Indirizzo</TableHead>
          <TableHead>Prodotti</TableHead>
          <TableHead>Utente</TableHead>
          <TableHead>Crediti AI</TableHead>
          <TableHead>Ultimo aggiornamento</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead className="text-right">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
              Nessun negozio trovato
            </TableCell>
          </TableRow>
        )}
        
        {shops.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell className="font-medium">{shop.name}</TableCell>
            <TableCell>{shop.address}</TableCell>
            <TableCell>{getProductsByShopId(shop.id).length}</TableCell>
            <TableCell>
              {shop.userId ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleViewUser(shop.userId)}
                  className="px-2 h-8"
                >
                  <User className="h-4 w-4 mr-1" />
                  {shop.user?.name || shop.userId.substring(0, 8)}
                </Button>
              ) : (
                <span className="text-muted-foreground">Nessuno</span>
              )}
            </TableCell>
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
                  onClick={() => safelyCallAction(shop, onViewShop)}
                  title="Visualizza"
                >
                  <Eye className="mr-1 h-4 w-4" /> {!isMobile && "Visualizza"}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => safelyCallAction(shop, onEditShop)}
                  title="Modifica"
                >
                  <Pencil className="mr-1 h-4 w-4" /> {!isMobile && "Modifica"}
                </Button>
                {onToggleStatus && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => shop && shop.id && onToggleStatus(shop.id, !shop.isActive)}
                    title={shop.isActive ? "Disattiva" : "Attiva"}
                  >
                    <Ban className="mr-1 h-4 w-4" /> {!isMobile && (shop.isActive ? "Disattiva" : "Attiva")}
                  </Button>
                )}
                {onApproveShop && shop.isApproved === false && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-green-500 hover:text-green-700"
                    onClick={() => shop && shop.id && onApproveShop(shop.id, true)}
                    title="Approva"
                  >
                    <CheckCircle className="mr-1 h-4 w-4" /> {!isMobile && "Approva"}
                  </Button>
                )}
                {onDeleteShop && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => shop && shop.id && onDeleteShop(shop.id)}
                    title="Elimina"
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
