
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";

interface ProductsFilterProps {
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (filter: "all" | "active" | "inactive") => void;
  categories: string[];
  onCategoryChange: (category: string) => void;
  openCategoryManager: () => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  statusFilter,
  setStatusFilter,
  categories,
  onCategoryChange,
  openCategoryManager
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Stato</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm"
            variant={statusFilter === "all" ? "default" : "outline"} 
            onClick={() => setStatusFilter("all")}
          >
            Tutti
          </Button>
          <Button 
            size="sm"
            variant={statusFilter === "active" ? "default" : "outline"} 
            onClick={() => setStatusFilter("active")}
          >
            Attivi
          </Button>
          <Button 
            size="sm"
            variant={statusFilter === "inactive" ? "default" : "outline"} 
            onClick={() => setStatusFilter("inactive")}
          >
            Inattivi
          </Button>
        </div>
      </div>

      <div className="md:ml-auto">
        <h3 className="text-sm font-medium mb-2">Categoria</h3>
        <div className="flex items-center gap-2">
          <ProductCategoriesManager 
            categories={categories.filter(c => c !== "all")} 
            onCategoryChange={onCategoryChange}
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
    </div>
  );
};

export default ProductsFilter;
