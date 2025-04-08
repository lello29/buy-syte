
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Calendar, 
  DollarSign,
  Tag,
  Star,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Shop } from '@/types';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

interface ViewShopDialogProps {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewShopDialog: React.FC<ViewShopDialogProps> = ({ 
  shop, 
  open, 
  onOpenChange 
}) => {
  const navigate = useNavigate();
  
  if (!shop) return null;
  
  const handleViewUser = () => {
    if (shop.userId) {
      onOpenChange(false); // Chiudi il dialogo
      navigate(`/dashboard/admin/users?id=${shop.userId}`);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{shop.name}</DialogTitle>
          <DialogDescription>{shop.description || "Nessuna descrizione disponibile"}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Basic info */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Stato</h4>
              <div className="flex space-x-2">
                <Badge variant={shop.isApproved ? "success" : "warning"}>
                  {shop.isApproved ? "Approvato" : "In attesa"}
                </Badge>
                {shop.isActive !== undefined && (
                  <Badge variant={shop.isActive ? "success" : "destructive"}>
                    {shop.isActive ? "Attivo" : "Inattivo"}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* User info */}
            <div className="flex items-start space-x-2">
              <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Utente</h4>
                {shop.userId ? (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {shop.user?.name || "Utente"} ({shop.user?.email || shop.userId.substring(0, 8)})
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleViewUser}
                      className="h-6 px-2"
                    >
                      Visualizza
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nessun utente associato</p>
                )}
              </div>
            </div>
            
            {shop.address && (
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Indirizzo</h4>
                  <p className="text-sm text-muted-foreground">{shop.address}</p>
                </div>
              </div>
            )}
            
            {shop.phone && (
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Telefono</h4>
                  <p className="text-sm text-muted-foreground">{shop.phone}</p>
                </div>
              </div>
            )}
            
            {shop.email && (
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Email</h4>
                  <p className="text-sm text-muted-foreground">{shop.email}</p>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Business info */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Informazioni aziendali</h4>
            
            {shop.category && (
              <div className="flex items-start space-x-2">
                <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Categoria</h4>
                  <p className="text-sm text-muted-foreground">{shop.category}</p>
                </div>
              </div>
            )}
            
            {shop.fiscalCode && (
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Codice Fiscale</h4>
                  <p className="text-sm text-muted-foreground">{shop.fiscalCode}</p>
                </div>
              </div>
            )}
            
            {shop.vatNumber && (
              <div className="flex items-start space-x-2">
                <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Partita IVA</h4>
                  <p className="text-sm text-muted-foreground">{shop.vatNumber}</p>
                </div>
              </div>
            )}
            
            {shop.aiCredits !== undefined && (
              <div className="flex items-start space-x-2">
                <Star className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Crediti AI</h4>
                  <p className="text-sm text-muted-foreground">{shop.aiCredits}</p>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Dates */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Data creazione</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(shop.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Ultimo aggiornamento</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(shop.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewShopDialog;
