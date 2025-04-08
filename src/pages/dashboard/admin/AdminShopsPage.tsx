
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
import { Database, AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { verifyRequiredTables } from "@/lib/supabase";
import { toast } from "sonner";

export default function AdminShopsPage() {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const {
    shopsList,
    isLoading,
    isMigrating,
    selectedShop,
    handleViewShop,
    handleEditShop,
    handleAddShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop,
    handleMigrateShops
  } = useShopState();
  
  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const { allTablesExist, missingTables } = await verifyRequiredTables();
        if (!allTablesExist) {
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
  
  // Empty state with migration option
  const EmptyShopsState = () => (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg space-y-4 border border-dashed border-gray-300">
      <AlertTriangle className="h-12 w-12 text-yellow-500 mb-2" />
      <h3 className="text-lg font-medium">Nessun negozio trovato</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Non sono stati trovati negozi nel database. È possibile migrare i dati di esempio per testare le funzionalità.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mt-4">
        <Button 
          onClick={handleMigrateShops} 
          className="flex-1 flex items-center justify-center gap-2"
          disabled={isMigrating}
        >
          {isMigrating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          {isMigrating ? "Migrazione in corso..." : "Migra Negozi di Esempio"}
        </Button>
        
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
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ShopsPageHeader 
          handleAddShop={handleAddShop} 
          isMobile={isMobile !== null ? isMobile : false} 
        />
        
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
            onDeleteShop={handleDeleteShop}
            onAddShop={handleAddShop}
            onApproveShop={handleApproveShop}
          />
        ) : (
          <ShopsTable 
            shops={shopsList}
            onViewShop={handleViewShop}
            onEditShop={handleEditShop}
            onToggleStatus={handleToggleStatus}
            onDeleteShop={handleDeleteShop}
            onApproveShop={handleApproveShop}
          />
        )}
        
        <ShopDialogs />
      </div>
    </div>
  );
}
