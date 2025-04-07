
import React from "react";
import ShopsPageHeader from "@/components/admin/shops/ShopsPageHeader";
import ShopsTable from "@/components/admin/shops/ShopsTable";
import MobileShopsList from "@/components/admin/shops/MobileShopsList";
import ShopDialogs from "@/components/admin/shops/ShopDialogs";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminShopsPage() {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <ShopsPageHeader 
          handleAddShop={() => {}} 
          isMobile={isMobile !== null ? isMobile : false} 
        />
        
        {/* Responsive layout based on screen size */}
        {isMobile ? (
          <MobileShopsList 
            shops={[]}
            onViewShop={() => {}}
            onEditShop={() => {}}
            onToggleStatus={() => {}}
            onDeleteShop={() => {}}
            onAddShop={() => {}}
          />
        ) : (
          <ShopsTable 
            shops={[]}
            onViewShop={() => {}}
            onEditShop={() => {}}
          />
        )}
        
        {/* Dialogs for adding, editing, and viewing shops */}
        <ShopDialogs />
      </div>
    </div>
  );
}
