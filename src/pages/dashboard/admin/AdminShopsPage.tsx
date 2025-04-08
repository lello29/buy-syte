
import React, { useState, useEffect } from "react";
import ShopsPageHeader from "@/components/admin/shops/ShopsPageHeader";
import ShopsTable from "@/components/admin/shops/ShopsTable";
import MobileShopsList from "@/components/admin/shops/MobileShopsList";
import ShopDialogs from "@/components/admin/shops/ShopDialogs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShopState } from "@/components/admin/shops/hooks/useShopState";
import { toast } from "sonner";
import { Shop } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminShopsPage() {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const {
    shopsList,
    selectedShop,
    setSelectedShop,
    isViewShopOpen,
    setIsViewShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isAddShopOpen,
    setIsAddShopOpen,
    handleAddShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop
  } = useShopState();
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  };
  
  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ShopsPageHeader 
          handleAddShop={handleAddShop} 
          isMobile={isMobile !== null ? isMobile : false} 
        />
        
        {/* Responsive layout based on screen size */}
        {isMobile ? (
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
        
        {/* Dialogs for adding, editing, and viewing shops */}
        <ShopDialogs />
      </div>
    </div>
  );
}
