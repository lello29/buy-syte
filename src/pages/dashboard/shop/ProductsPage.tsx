
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { getProductsByShopId } from "@/data/products";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Shop } from "@/types";

// UI Components
import ProductsHeader from "@/components/products/ProductsHeader";
import AddProductDialog from "@/components/products/AddProductDialog";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";

// Refactored Components
import ProductsPageHeader from "./components/ProductsPageHeader";
import ProductsFilterBar from "./components/ProductsFilterBar";
import ProductsContent from "./components/ProductsContent";
import ProductsMetricsSection from "./components/ProductsMetricsSection";
import ShopAuthCheck from "./components/ShopAuthCheck";

const ProductsPage = () => {
  const { currentUser, getUserShop } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchShop = async () => {
      if (currentUser && currentUser.role === "shop") {
        try {
          const shopData = await getUserShop();
          setShop(shopData || null);
        } catch (error) {
          console.error("Error fetching shop data:", error);
          toast.error("Errore nel caricamento dei dati del negozio");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchShop();
  }, [currentUser, getUserShop]);
  
  // Use ShopAuthCheck component to handle authentication and shop validation
  return (
    <ShopAuthCheck>
      {shop && (
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

          {/* Add Product Dialog for desktop */}
          {showAddModal && (
            <AddProductDialog 
              trigger={<div className="hidden" />} 
              open={showAddModal}
              onOpenChange={(open) => setShowAddModal(open)}
            />
          )}
        </div>
      )}
    </ShopAuthCheck>
  );
  
  // Move all the derived values and handlers inside the component body
  const products = shop ? getProductsByShopId(shop.id) : [];
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    if (isMobile) {
      navigate('/dashboard/products/add');
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

  const shopNames = shop ? { [shop.id]: shop.name } : {};
  
  const handleToggleProductStatus = (id: string, newStatus: boolean) => {
    toast.success(`Prodotto ${newStatus ? 'attivato' : 'disattivato'} con successo`);
  };
  
  const handleViewProduct = (product: any) => {
    navigate(`/dashboard/products/${product.id}`);
  };
};

export default ProductsPage;
