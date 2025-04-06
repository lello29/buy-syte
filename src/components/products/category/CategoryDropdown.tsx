
import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryDropdownProps {
  categories: string[];
  onCategoryChange?: (category: string) => void;
  onManageCategories?: () => void;
  className?: string;
  dropdownOnly?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categories,
  onCategoryChange,
  onManageCategories,
  className,
  dropdownOnly = false,
}) => {
  const handleSelectCategory = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Folder className="mr-2 h-4 w-4" />
          Categorie
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Seleziona Categoria</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {categories.map((category) => (
          <DropdownMenuItem 
            key={category}
            onClick={() => handleSelectCategory(category)}
          >
            {category}
          </DropdownMenuItem>
        ))}
        
        {!dropdownOnly && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onManageCategories}>
              <Edit className="mr-2 h-4 w-4" />
              Gestisci Categorie
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
