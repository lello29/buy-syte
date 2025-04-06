
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CategoryDropdown from "./category/CategoryDropdown";
import CategoryDialog from "./category/CategoryDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCategoriesManagerProps {
  categories: string[];
  onCategoryChange?: (category: string) => void;
  className?: string;
  dropdownOnly?: boolean;
}

const ProductCategoriesManager: React.FC<ProductCategoriesManagerProps> = ({
  categories,
  onCategoryChange,
  className,
  dropdownOnly = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [managedCategories, setManagedCategories] = useState<string[]>(categories);
  const isMobile = useIsMobile();

  const handleCategoriesChange = (updatedCategories: string[]) => {
    setManagedCategories(updatedCategories);
    // Se una funzione di callback è fornita, notifica il componente padre
    if (onCategoryChange && updatedCategories.length > 0) {
      onCategoryChange(updatedCategories[0]); // Seleziona la prima categoria di default
    }
  };

  const openCategoryManager = () => {
    setIsDialogOpen(true);
  };

  // Hidden button to trigger the categories management dialog directly
  const manageCategoriesButton = (
    <Button 
      id="manage-categories-button" 
      className="hidden" 
      onClick={openCategoryManager}
    >
      Gestisci Categorie
    </Button>
  );

  return (
    <>
      {manageCategoriesButton}
      
      {!dropdownOnly && (
        <Button 
          variant="outline" 
          onClick={openCategoryManager}
          className={isMobile ? "w-full" : ""}
        >
          <Edit className="h-4 w-4 mr-2" />
          Gestione Categorie
        </Button>
      )}
      
      {!isMobile && (
        <CategoryDropdown
          categories={managedCategories}
          onCategoryChange={onCategoryChange}
          onManageCategories={openCategoryManager}
          className={className}
          dropdownOnly={dropdownOnly}
        />
      )}

      <CategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        categories={managedCategories}
        onCategoriesChange={handleCategoriesChange}
      />
    </>
  );
};

export default ProductCategoriesManager;
