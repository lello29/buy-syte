
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getProductsByShopId } from "@/data/mockData";
import { toast } from "sonner";

import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductsTable from "@/components/products/ProductsTable";
import EmptyProductsState from "@/components/products/EmptyProductsState";
import ProductsMetrics from "@/components/products/ProductsMetrics";
import ProductsSalesHints from "@/components/products/ProductsSalesHints";

const ProductsPage = () => {
  const { currentUser, getUserShop } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
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
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    setShowAddModal(true);
    // This is where the add product modal would be triggered
    toast.info("Funzione di aggiunta prodotto in fase di sviluppo");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <ProductsHeader onAddProduct={handleAddProduct} />
      
      <ProductsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {filteredProducts.length > 0 ? (
        <ProductsTable products={filteredProducts} />
      ) : (
        <EmptyProductsState 
          searchTerm={searchTerm} 
          onAddProduct={handleAddProduct}
          onClearSearch={clearSearch} 
        />
      )}
      
      <ProductsMetrics products={products} />
      
      <ProductsSalesHints />
    </div>
  );
};

export default ProductsPage;
