
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getProductsByShopId } from "@/data/mockData";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

// UI Components
import ProductsHeader from "@/components/products/ProductsHeader";
import AddProductDialog from "@/components/products/AddProductDialog";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";

// Refactored Components
import ProductsPageHeader from "./components/ProductsPageHeader";
import ProductsFilterBar from "./components/ProductsFilterBar";
import ProductsContent from "./components/ProductsContent";
import ProductsMetricsSection from "./components/ProductsMetricsSection";

const ProductsPage = () => {
  const { currentUser, getUserShop } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div>Accesso non autorizzato</div>;
  }
  
  const shop = getUserShop();
  
  if (!shop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Negozio non configurato</h2>
        <p className="text-muted-foreground mb-6">
          Il tuo account negozio non è ancora associato a un profilo negozio. 
          Contatta l'amministratore per configurare il tuo profilo.
        </p>
      </div>
    );
  }
  
  const products = getProductsByShopId(shop.id);
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (isMobile) {
      setShowAddModal(true);
    } else {
      setShowAddModal(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const openCategoryManager = () => {
    const manageCategoriesButton = document.getElementById("manage-categories-button");
    if (manageCategoriesButton) {
      manageCategoriesButton.click();
    } else {
      toast.error("Impossibile aprire la gestione categorie");
    }
  };

  const shopNames = { [shop.id]: shop.name };
  
  const handleToggleProductStatus = (id: string, newStatus: boolean) => {
    toast.success(`Prodotto ${newStatus ? 'attivato' : 'disattivato'} con successo`);
  };
  
  const handleViewProduct = (product: any) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  return (
    <div className="space-y-5">
      <ProductsPageHeader shopName={shop.name} />
      
      {!isMobile && <ProductsHeader onAddProduct={handleAddProduct} />}
      
      <ProductsFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        openCategoryManager={openCategoryManager}
      />
      
      <ProductsContent 
        products={products}
        filteredProducts={filteredProducts}
        searchTerm={searchTerm}
        onAddProduct={handleAddProduct}
        onClearSearch={clearSearch}
        handleToggleProductStatus={handleToggleProductStatus}
        handleViewProduct={handleViewProduct}
        shopNames={shopNames}
      />
      
      {!isMobile && <ProductsMetricsSection products={products} />}

      {/* Hidden component for managing categories */}
      <div className="hidden">
        <ProductCategoriesManager 
          categories={categories.filter(c => c !== "all")} 
          onCategoryChange={setCategoryFilter}
        />
      </div>

      {/* Add Product Dialog for all devices */}
      {showAddModal && (
        <AddProductDialog 
          trigger={<div className="hidden" />} 
          open={showAddModal}
          onOpenChange={(open) => setShowAddModal(open)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
