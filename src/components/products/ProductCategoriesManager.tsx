
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CategoryDropdown from "./category/CategoryDropdown";
import CategoryDialog from "./category/CategoryDialog";

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

  const handleCategoriesChange = (updatedCategories: string[]) => {
    setManagedCategories(updatedCategories);
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
      
      <CategoryDropdown
        categories={managedCategories}
        onCategoryChange={onCategoryChange}
        onManageCategories={openCategoryManager}
        className={className}
        dropdownOnly={dropdownOnly}
      />

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
