
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductsTable from "@/components/products/ProductsTable";
import EmptyProductsState from "@/components/products/EmptyProductsState";
import MobileProductsList from "@/components/products/MobileProductsList";
import MobileAddButton from "./MobileAddButton";
import { Product } from "@/types";

interface ProductsContentProps {
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  onAddProduct: () => void;
  onClearSearch: () => void;
  handleToggleProductStatus: (id: string, newStatus: boolean) => void;
  handleViewProduct: (product: any) => void;
  shopNames: Record<string, string>;
}

const ProductsContent: React.FC<ProductsContentProps> = ({
  products,
  filteredProducts,
  searchTerm,
  onAddProduct,
  onClearSearch,
  handleToggleProductStatus,
  handleViewProduct,
  shopNames
}) => {
  const isMobile = useIsMobile();

  if (filteredProducts.length === 0) {
    return (
      <EmptyProductsState 
        searchTerm={searchTerm} 
        onAddProduct={onAddProduct}
        onClearSearch={onClearSearch} 
      />
    );
  }

  return (
    <>
      {isMobile ? (
        <>
          <MobileProductsList 
            products={filteredProducts}
            shopNames={shopNames}
            onToggleProductStatus={handleToggleProductStatus}
            onAddProduct={onAddProduct}
            onViewProduct={handleViewProduct}
          />
          <MobileAddButton onClick={onAddProduct} />
        </>
      ) : (
        <ProductsTable 
          products={filteredProducts}
          onToggleProductStatus={handleToggleProductStatus}
          onViewProduct={handleViewProduct}
        />
      )}
    </>
  );
};

export default ProductsContent;
