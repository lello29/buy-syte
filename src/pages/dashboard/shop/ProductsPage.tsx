import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getProductsByShopId } from "@/data/mockData";
import { toast } from "sonner";

import ProductsHeader from "@/components/products/ProductsHeader";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductsTable from "@/components/products/ProductsTable";
import EmptyProductsState from "@/components/products/EmptyProductsState";
import ProductsMetrics from "@/components/products/ProductsMetrics";
import ProductsSalesHints from "@/components/products/ProductsSalesHints";
import AddProductDialog from "@/components/products/AddProductDialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";
import MobileProductsList from "@/components/products/MobileProductsList";
import { useNavigate } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const ProductsPage = () => {
  const { currentUser, getUserShop } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
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
  
  // Extract unique categories from products
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    // Apply search filter
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter if not "all"
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    try {
      if (isMobile) {
        // Log per debug
        console.log("Tentativo di navigazione verso /dashboard/products/add su mobile");
        navigate("/dashboard/products/add");
      } else {
        setShowAddModal(true);
      }
    } catch (error) {
      console.error("Errore durante la navigazione:", error);
      toast.error("Impossibile accedere alla pagina di aggiunta prodotto");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const openCategoryManager = () => {
    // Find and click the hidden manage-categories-button
    const manageCategoriesButton = document.getElementById("manage-categories-button");
    if (manageCategoriesButton) {
      manageCategoriesButton.click();
    } else {
      toast.error("Impossibile aprire la gestione categorie");
    }
  };

  // Per il componente mobile
  const shopNames = { [shop.id]: shop.name };
  
  const handleToggleProductStatus = (id: string, newStatus: boolean) => {
    toast.success(`Prodotto ${newStatus ? 'attivato' : 'disattivato'} con successo`);
  };
  
  const handleViewProduct = (product: any) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  return (
    <div className="space-y-5">
      {isMobile ? (
        <>
          <div className="flex flex-col space-y-4">
            <ProductsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            <div className="flex gap-2 w-full">
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtra per categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le categorie</SelectItem>
                  {categories.filter(c => c !== "all").map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="shrink-0"
                onClick={openCategoryManager}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            {filteredProducts.length > 0 ? (
              <MobileProductsList 
                products={filteredProducts}
                shopNames={shopNames}
                onToggleProductStatus={handleToggleProductStatus}
                onAddProduct={handleAddProduct}
                onViewProduct={handleViewProduct}
              />
            ) : (
              <EmptyProductsState 
                searchTerm={searchTerm} 
                onAddProduct={handleAddProduct}
                onClearSearch={clearSearch} 
              />
            )}
          </div>
        </>
      ) : (
        <>
          <ProductsHeader onAddProduct={handleAddProduct} />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <ProductsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            
            <div className="flex gap-2 w-full sm:w-auto">
              <ProductCategoriesManager 
                categories={categories.filter(c => c !== "all")} 
                onCategoryChange={handleCategoryChange}
                dropdownOnly={true}
              />
              
              <Button 
                variant="outline" 
                onClick={openCategoryManager}
              >
                <Edit className="h-4 w-4 mr-2" />
                Gestione Categorie
              </Button>
            </div>
          </div>
          
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
        </>
      )}

      {/* Hidden component for managing categories */}
      <div className="hidden">
        <ProductCategoriesManager 
          categories={categories.filter(c => c !== "all")} 
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Mobile Floating Action Button */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-10">
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg bg-primary text-white"
            onClick={handleAddProduct}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Add Product Dialog for desktop */}
      {!isMobile && showAddModal && (
        <AddProductDialog 
          trigger={<div className="hidden" />} 
        />
      )}
    </div>
  );
};

export default ProductsPage;
