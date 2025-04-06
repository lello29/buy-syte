
import React, { useState } from "react";
import { toast } from "sonner";
import { shops } from "@/data/mockData";
import { Shop } from "@/types";
import ShopsHeader from "@/components/admin/shops/ShopsHeader";
import ShopsSearchBar from "@/components/admin/shops/ShopsSearchBar";
import ShopsListTable from "@/components/admin/shops/ShopsListTable";
import ShopDetailsDialog from "@/components/admin/shops/ShopDetailsDialog";
import DeleteShopDialog from "@/components/admin/shops/DeleteShopDialog";
import ShopDialogs from "@/components/admin/shops/ShopDialogs";

const AdminShopsPage = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Filter shops based on search term
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsViewDialogOpen(true);
  };

  const handleDeleteConfirmation = (shopId: string) => {
    setConfirmDeleteId(shopId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (confirmDeleteId) {
      // In a real app, this would call an API to delete the shop
      toast({
        title: "Negozio eliminato",
        description: "Il negozio è stato eliminato con successo.",
      });
      setIsDeleteDialogOpen(false);
      setConfirmDeleteId(null);
    }
  };

  const handleToggleApproval = (shop: Shop) => {
    // In a real app, this would call an API to update the shop
    toast({
      title: shop.isApproved ? "Approvazione revocata" : "Negozio approvato",
      description: shop.isApproved 
        ? "Il negozio non è più approvato." 
        : "Il negozio è ora approvato.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ShopsHeader 
        title="Gestione Negozi"
        description="Gestione e controllo dei negozi sulla piattaforma."
      />
      
      {/* Search Bar */}
      <ShopsSearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Shops List Table */}
      <ShopsListTable 
        shops={filteredShops}
        onViewShop={handleViewShop}
        onToggleApproval={handleToggleApproval}
        onDeleteShop={handleDeleteConfirmation}
      />

      {/* Shop Details Dialog */}
      <ShopDetailsDialog 
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedShop={selectedShop}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteShopDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />
      
      {/* Shop Add/Edit Dialogs */}
      <ShopDialogs />
    </div>
  );
};

export default AdminShopsPage;
