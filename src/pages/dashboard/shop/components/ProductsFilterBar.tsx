
import React from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ProductsFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: string[];
  openCategoryManager: () => void;
}

const ProductsFilterBar: React.FC<ProductsFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  categories,
  openCategoryManager
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col space-y-4">
          <ProductsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="flex gap-2 w-full">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <ProductsSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="flex gap-2 w-full sm:w-auto">
            <ProductCategoriesManager 
              categories={categories.filter(c => c !== "all")} 
              onCategoryChange={setCategoryFilter}
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
      )}
    </>
  );
};

export default ProductsFilterBar;
