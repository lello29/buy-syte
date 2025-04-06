
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
import { useIsMobile } from "@/hooks/use-mobile";
import CategoryList from "./CategoryList";

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
            <CategoryList 
              categories={managedCategories} 
              onCategoriesChange={(updatedCategories) => {
                setManagedCategories(updatedCategories);
                onCategoriesChange(updatedCategories);
              }} 
            />
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
