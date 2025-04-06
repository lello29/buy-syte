
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { getProductsByShopId } from "@/data/products";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { Shop, Product } from "@/types";

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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [shopNames, setShopNames] = useState<Record<string, string>>({});
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  // Define handler functions before using them
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
  
  const handleToggleProductStatus = (id: string, newStatus: boolean) => {
    toast.success(`Prodotto ${newStatus ? 'attivato' : 'disattivato'} con successo`);
  };
  
  const handleViewProduct = (product: any) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  // Fetch shop data
  useEffect(() => {
    const fetchShop = async () => {
      if (currentUser && currentUser.role === "shop") {
        try {
          const shopData = await getUserShop();
          setShop(shopData || null);
          
          if (shopData) {
            // Load products for the shop
            const shopProducts = getProductsByShopId(shopData.id);
            setProducts(shopProducts);
            
            // Extract categories from products
            const productCategories = ["all", ...Array.from(new Set(shopProducts.map(p => p.category)))];
            setCategories(productCategories);
            
            // Set shop names mapping
            setShopNames({ [shopData.id]: shopData.name });
          }
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
  
  // Update filtered products whenever products or filters change
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter]);
  
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
};

export default ProductsPage;
