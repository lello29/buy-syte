
import React from 'react';
import ShopsTable from '@/components/admin/shops/ShopsTable';
import MobileShopsList from '@/components/admin/shops/MobileShopsList';
import { useIsMobile } from '@/hooks/use-mobile';
import ShopsPageHeader from '@/components/admin/shops/ShopsPageHeader';
import ShopDialogs from '@/components/admin/shops/ShopDialogs';
import { useShopState } from '@/components/admin/shops/hooks/useShopState';
import { useShopForm } from '@/components/admin/shops/hooks/useShopForm';

const AdminShopsPage: React.FC = () => {
  const isMobile = useIsMobile();
  
  const {
    shopsList,
    setShopsList,
    isAddShopOpen,
    setIsAddShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isViewShopOpen,
    setIsViewShopOpen,
    selectedShop,
    setSelectedShop,
    newShop,
    setNewShop,
    handleAddShop,
    handleViewShop,
    handleEditShop,
    handleDeleteShop,
    handleToggleStatus,
  } = useShopState();

  const {
    handleShopChange,
    handleNewShopChange,
    handleSelectChange,
    handleCheckboxChange,
    handleGetLocation,
    handleCreateShop,
    handleSaveChanges
  } = useShopForm(
    selectedShop,
    setSelectedShop,
    newShop,
    setNewShop,
    setShopsList,
    setIsAddShopOpen,
    setIsEditShopOpen
  );
  
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
        />
      ) : (
        <ShopsTable 
          shops={shopsList} 
          onViewShop={handleViewShop}
          onEditShop={handleEditShop}
          onToggleStatus={handleToggleStatus}
          onDeleteShop={handleDeleteShop}
        />
      )}
      
      <ShopDialogs
        isAddShopOpen={isAddShopOpen}
        setIsAddShopOpen={setIsAddShopOpen}
        isViewShopOpen={isViewShopOpen}
        setIsViewShopOpen={setIsViewShopOpen}
        isEditShopOpen={isEditShopOpen}
        setIsEditShopOpen={setIsEditShopOpen}
        selectedShop={selectedShop}
        newShop={newShop}
        handleNewShopChange={handleNewShopChange}
        handleSelectChange={handleSelectChange}
        handleCreateShop={handleCreateShop}
        handleShopChange={handleShopChange}
        handleCheckboxChange={handleCheckboxChange}
        handleGetLocation={handleGetLocation}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default AdminShopsPage;
