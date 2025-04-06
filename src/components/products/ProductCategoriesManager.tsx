
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit, Folder, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
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

    setManagedCategories([...managedCategories, newCategory.trim()]);
    setNewCategory("");
    toast.success("Categoria aggiunta con successo");
  };

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = [...managedCategories];
    updatedCategories.splice(index, 1);
    setManagedCategories(updatedCategories);
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
    setEditingCategory(null);
    toast.success("Categoria aggiornata con successo");
  };

  const handleSelectCategory = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  // Hidden button to trigger the categories management dialog directly
  const manageCategoriesButton = (
    <Button 
      id="manage-categories-button" 
      className="hidden" 
      onClick={() => setIsDialogOpen(true)}
    >
      Gestisci Categorie
    </Button>
  );

  return (
    <>
      {manageCategoriesButton}
      
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
              <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Gestisci Categorie
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                      {editingCategory && editingCategory.index === index ? (
                        <div className="flex-1 flex items-center space-x-2">
                          <Input
                            value={editingCategory.value}
                            onChange={(e) => setEditingCategory({...editingCategory, value: e.target.value})}
                            className="flex-1"
                          />
                          <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="flex-1">{category}</span>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost" onClick={() => handleStartEdit(index)}>
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteCategory(index)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Chiudi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCategoriesManager;
