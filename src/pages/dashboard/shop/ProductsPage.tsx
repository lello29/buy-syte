
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
import AddProductDialog from "@/components/products/AddProductDialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";
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
    setShowAddModal(true);
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
    }
  };

  return (
    <div className="space-y-5">
      <ProductsHeader onAddProduct={handleAddProduct} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <ProductsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex gap-2 w-full sm:w-auto">
          {isMobile ? (
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
          ) : (
            <ProductCategoriesManager 
              categories={categories.filter(c => c !== "all")} 
              onCategoryChange={handleCategoryChange}
              dropdownOnly={true}
            />
          )}
        </div>
      </div>
      
      {/* Mobile category management button */}
      {isMobile && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={openCategoryManager}
        >
          <Edit className="h-4 w-4 mr-2" />
          Gestisci Categorie
        </Button>
      )}
      
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
      
      {isMobile ? null : <ProductsSalesHints />}

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
          <AddProductDialog
            trigger={
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
                <Plus className="h-6 w-6" />
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
