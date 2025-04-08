
import React from "react";
import ShopsPageHeader from "@/components/admin/shops/ShopsPageHeader";
import ShopsTable from "@/components/admin/shops/ShopsTable";
import MobileShopsList from "@/components/admin/shops/MobileShopsList";
import ShopDialogs from "@/components/admin/shops/ShopDialogs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShopState } from "@/components/admin/shops/hooks/useShopState";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminShopsPage() {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
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
      <Button 
        onClick={handleMigrateShops} 
        className="mt-4 flex items-center gap-2"
        disabled={isMigrating}
      >
        {isMigrating ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Database className="h-4 w-4" />
        )}
        {isMigrating ? "Migrazione in corso..." : "Migra Negozi di Esempio"}
      </Button>
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
