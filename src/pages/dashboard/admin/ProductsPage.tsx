
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { products, shops } from "@/data/mockData";
import { useIsMobile } from '@/hooks/use-mobile';
import MobileProductsList from "@/components/products/MobileProductsList";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";
import ProductsTable from "@/components/admin/products/ProductsTable";
import ProductDetailsDialog from "@/components/admin/products/ProductDetailsDialog";
import ProductsFilter from "@/components/admin/products/ProductsFilter";
import MobileProductsFilter from "@/components/admin/products/MobileProductsFilter";

const ProductsPage = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))];

  const handleToggleProductStatus = (id: string, isActive: boolean) => {
    toast.success(`Stato del prodotto aggiornato con successo`);
  };

  const filteredProducts = products
    .filter(product => statusFilter === "all" ? true : statusFilter === "active" ? product.isActive : !product.isActive)
    .filter(product => categoryFilter === "all" ? true : product.category === categoryFilter);

  const getShopName = (shopId: string) => {
    const shop = shops.find(s => s.id === shopId);
    return shop ? shop.name : "Negozio non trovato";
  };

  // Create a mapping of shop IDs to shop names for easy lookup
  const shopNames: Record<string, string> = {};
  shops.forEach(shop => {
    shopNames[shop.id] = shop.name;
  });

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleAddProduct = () => {
    toast.info("Funzionalità in sviluppo");
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

  const mobileHeader = (
    <div className="md:hidden">
      <h1 className="text-3xl font-bold mb-2">Gestione Prodotti</h1>
      <p className="text-gray-600 mb-6">
        Elenco di tutti i prodotti sulla piattaforma
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {!isMobile && (
        <>
          <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
          <p className="text-gray-600">
            Visualizza e gestisci i prodotti disponibili sulla piattaforma.
          </p>
        </>
      )}

      {isMobile ? (
        <>
          {mobileHeader}
          
          <MobileProductsFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categoryFilter={categoryFilter}
            categories={categories}
            handleCategoryChange={handleCategoryChange}
            openCategoryManager={openCategoryManager}
          />
          
          <MobileProductsList 
            products={filteredProducts}
            shopNames={shopNames}
            onToggleProductStatus={handleToggleProductStatus}
            onAddProduct={handleAddProduct}
            onViewProduct={handleViewProduct}
          />
        </>
      ) : (
        <>
          <ProductsFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categories={categories}
            onCategoryChange={handleCategoryChange}
            openCategoryManager={openCategoryManager}
          />

          <ProductsTable
            products={filteredProducts}
            getShopName={getShopName}
            onToggleStatus={handleToggleProductStatus}
            onViewProduct={handleViewProduct}
            onAddProduct={handleAddProduct}
          />
        </>
      )}

      {/* Hidden component for managing categories */}
      <div className="hidden">
        <ProductCategoriesManager 
          categories={categories.filter(c => c !== "all")} 
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* View Product Details Dialog */}
      <ProductDetailsDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        product={selectedProduct}
        getShopName={getShopName}
        onToggleStatus={handleToggleProductStatus}
      />
    </div>
  );
};

export default ProductsPage;
