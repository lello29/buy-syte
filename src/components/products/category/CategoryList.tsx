
import React from "react";
import { toast } from "sonner";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onCategoriesChange,
}) => {
  const [editingCategory, setEditingCategory] = React.useState<{index: number, value: string} | null>(null);

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    onCategoriesChange(updatedCategories);
    toast.success("Categoria eliminata con successo");
  };

  const handleStartEdit = (index: number) => {
    setEditingCategory({
      index,
      value: categories[index]
    });
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleEditChange = (value: string) => {
    if (editingCategory) {
      setEditingCategory({...editingCategory, value});
    }
  };

  const handleSaveEdit = () => {
    if (!editingCategory) return;
    
    if (!editingCategory.value.trim()) {
      toast.error("Il nome della categoria non può essere vuoto");
      return;
    }

    if (categories.includes(editingCategory.value.trim()) && 
        categories[editingCategory.index] !== editingCategory.value.trim()) {
      toast.error("Questa categoria esiste già");
      return;
    }

    const updatedCategories = [...categories];
    updatedCategories[editingCategory.index] = editingCategory.value.trim();
    onCategoriesChange(updatedCategories);
    setEditingCategory(null);
    toast.success("Categoria aggiornata con successo");
  };

  if (categories.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nessuna categoria disponibile
      </div>
    );
  }

  return (
    <div className="divide-y">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center justify-between p-3">
          <CategoryItem
            category={category}
            index={index}
            isEditing={editingCategory !== null && editingCategory.index === index}
            editValue={editingCategory?.value || ""}
            onStartEdit={handleStartEdit}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
            onDeleteCategory={handleDeleteCategory}
            onEditChange={handleEditChange}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
