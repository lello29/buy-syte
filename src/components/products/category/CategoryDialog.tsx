
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import CategoryItem from "./CategoryItem";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({
  isOpen,
  onClose,
  categories,
  onCategoriesChange,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [managedCategories, setManagedCategories] = useState<string[]>(categories);
  const [editingCategory, setEditingCategory] = useState<{index: number, value: string} | null>(null);
  const isMobile = useIsMobile();

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast.error("Inserisci un nome per la categoria");
      return;
    }

    if (managedCategories.includes(newCategory.trim())) {
      toast.error("Questa categoria esiste già");
      return;
    }

    const updatedCategories = [...managedCategories, newCategory.trim()];
    setManagedCategories(updatedCategories);
    onCategoriesChange(updatedCategories);
    setNewCategory("");
    toast.success("Categoria aggiunta con successo");
  };

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = [...managedCategories];
    updatedCategories.splice(index, 1);
    setManagedCategories(updatedCategories);
    onCategoriesChange(updatedCategories);
    toast.success("Categoria eliminata con successo");
  };

  const handleStartEdit = (index: number) => {
    setEditingCategory({
      index,
      value: managedCategories[index]
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

    if (managedCategories.includes(editingCategory.value.trim()) && 
        managedCategories[editingCategory.index] !== editingCategory.value.trim()) {
      toast.error("Questa categoria esiste già");
      return;
    }

    const updatedCategories = [...managedCategories];
    updatedCategories[editingCategory.index] = editingCategory.value.trim();
    setManagedCategories(updatedCategories);
    onCategoriesChange(updatedCategories);
    setEditingCategory(null);
    toast.success("Categoria aggiornata con successo");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={isMobile ? "w-[90vw] max-w-lg" : "max-w-md"}>
        <DialogHeader>
          <DialogTitle>Gestione Categorie</DialogTitle>
          <DialogDescription>
            Aggiungi, modifica o elimina le categorie dei prodotti.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Nuova categoria"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddCategory} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="border rounded-md">
            {managedCategories.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Nessuna categoria disponibile
              </div>
            ) : (
              <div className="divide-y">
                {managedCategories.map((category, index) => (
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
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Chiudi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
