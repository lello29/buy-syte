
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Check, X } from "lucide-react";

interface CategoryItemProps {
  category: string;
  index: number;
  isEditing: boolean;
  editValue: string;
  onStartEdit: (index: number) => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onDeleteCategory: (index: number) => void;
  onEditChange: (value: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  index,
  isEditing,
  editValue,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDeleteCategory,
  onEditChange,
}) => {
  if (isEditing) {
    return (
      <div className="flex-1 flex items-center space-x-2">
        <Input
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          className="flex-1"
        />
        <Button size="sm" variant="ghost" onClick={onSaveEdit}>
          <Check className="h-4 w-4 text-green-500" />
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancelEdit}>
          <X className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <span className="flex-1">{category}</span>
      <div className="flex items-center space-x-1">
        <Button size="sm" variant="ghost" onClick={() => onStartEdit(index)}>
          <Edit className="h-4 w-4 text-gray-500" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onDeleteCategory(index)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </>
  );
};

export default CategoryItem;
