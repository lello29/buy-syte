
import React, { useEffect } from "react";
import ShopsPageHeader from "@/components/admin/shops/ShopsPageHeader";
import ShopsTable from "@/components/admin/shops/ShopsTable";
import MobileShopsList from "@/components/admin/shops/MobileShopsList";
import ShopDialogs from "@/components/admin/shops/ShopDialogs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShopState } from "@/components/admin/shops/hooks/useShopState";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { verifyRequiredTables } from "@/lib/supabase";

export default function AdminShopsPage() {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const {
    shopsList,
    isLoading,
    isDeleting,
    handleViewShop,
    handleEditShop,
    handleAddShop,
    handleDeleteButtonClick,
    handleToggleStatus,
    handleApproveShop,
    handleOpenDeleteAllDialog
  } = useShopState();
  
  useEffect(() => {
    const checkDatabase = async () => {
      try {
        console.log("Checking database tables...");
        const { allTablesExist, missingTables } = await verifyRequiredTables();
        if (!allTablesExist) {
          console.log("Missing tables:", missingTables);
          toast.warning(`Alcune tabelle del database sono mancanti: ${missingTables.join(', ')}. Vai nelle impostazioni per migrare i dati.`);
        }
      } catch (error) {
        console.error("Error checking database tables:", error);
      }
    };
    
    checkDatabase();
  }, []);
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  // Empty state with removal option
  const EmptyShopsState = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg space-y-4 border border-dashed border-gray-300">
      <AlertTriangle className="h-12 w-12 text-yellow-500 mb-2" />
      <h3 className="text-lg font-medium">Nessun negozio trovato</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Non sono stati trovati negozi nel database.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4">        
        <Button 
          variant="outline"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={() => navigate('/dashboard/admin/settings')}
        >
          <AlertTriangle className="h-4 w-4" />
          Vai alle Impostazioni
        </Button>
      </div>
    </div>
  );
  
  const DeleteAllButton = () => (
    <Button 
      variant="destructive"
      onClick={handleOpenDeleteAllDialog}
      disabled={isDeleting || shopsList.length === 0}
      className="ml-2"
    >
      {isDeleting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Eliminazione in corso...
        </>
      ) : (
        <>
          <Trash2 className="mr-2 h-4 w-4" />
          Elimina Tutti i Negozi
        </>
      )}
    </Button>
  );
  
  console.log("handleAddShop function exists:", typeof handleAddShop === 'function');
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <ShopsPageHeader 
            handleAddShop={handleAddShop} 
            isMobile={isMobile !== null ? isMobile : false}
          />
          <DeleteAllButton />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <p className="text-muted-foreground">Caricamento...</p>
          </div>
        ) : shopsList.length === 0 ? (
          <EmptyShopsState />
        ) : isMobile ? (
          <MobileShopsList 
            shops={shopsList}
            onViewShop={handleViewShop}
            onEditShop={handleEditShop}
            onToggleStatus={handleToggleStatus}
            onDeleteShop={handleDeleteButtonClick}
            onAddShop={handleAddShop}
            onApproveShop={handleApproveShop}
          />
        ) : (
          <ShopsTable 
            shops={shopsList}
            onViewShop={handleViewShop}
            onEditShop={handleEditShop}
            onToggleStatus={handleToggleStatus}
            onDeleteShop={handleDeleteButtonClick}
            onApproveShop={handleApproveShop}
          />
        )}
        
        <ShopDialogs />
      </div>
    </div>
  );
}
