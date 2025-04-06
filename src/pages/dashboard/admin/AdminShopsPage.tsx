
import React from 'react';
import ShopsTable from '@/components/admin/shops/ShopsTable';
import MobileShopsList from '@/components/admin/shops/MobileShopsList';
import { useIsMobile } from '@/hooks/use-mobile';
import ShopsPageHeader from '@/components/admin/shops/ShopsPageHeader';
import ShopDialogs from '@/components/admin/shops/ShopDialogs';
import { useShopState } from '@/components/admin/shops/hooks/useShopState';

const AdminShopsPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  const {
    shopsList,
    handleAddShop,
    handleViewShop,
    handleEditShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop,
  } = useShopState();
  
  return (
    <div className="space-y-6">
      <ShopsPageHeader 
        handleAddShop={handleAddShop}
        isMobile={isMobile}
      />
      
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
      
      <ShopDialogs />
    </div>
  );
};

export default AdminShopsPage;
