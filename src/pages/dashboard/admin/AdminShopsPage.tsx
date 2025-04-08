
import React from "react";
import ShopsPageHeader from "@/components/admin/shops/ShopsPageHeader";
import ShopsTable from "@/components/admin/shops/ShopsTable";
import MobileShopsList from "@/components/admin/shops/MobileShopsList";
import ShopDialogs from "@/components/admin/shops/ShopDialogs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShopState } from "@/components/admin/shops/hooks/useShopState";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminShopsPage() {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const {
    shopsList,
    isLoading,
    selectedShop,
    handleViewShop,
    handleEditShop,
    handleAddShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop
  } = useShopState();
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
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
