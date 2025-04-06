
import React from "react";
import ProductsMetrics from "@/components/products/ProductsMetrics";
import ProductsSalesHints from "@/components/products/ProductsSalesHints";
import { Product } from "@/types";

interface ProductsMetricsSectionProps {
  products: Product[];
}

const ProductsMetricsSection: React.FC<ProductsMetricsSectionProps> = ({ products }) => {
  return (
    <>
      <ProductsMetrics products={products} />
      <ProductsSalesHints />
    </>
  );
};

export default ProductsMetricsSection;
