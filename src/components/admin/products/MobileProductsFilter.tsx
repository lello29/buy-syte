
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface MobileProductsFilterProps {
  statusFilter: "all" | "active" | "inactive";
  setStatusFilter: (filter: "all" | "active" | "inactive") => void;
  categoryFilter: string;
  categories: string[];
  handleCategoryChange: (category: string) => void;
  openCategoryManager: () => void;
}

const MobileProductsFilter: React.FC<MobileProductsFilterProps> = ({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  categories,
  handleCategoryChange,
  openCategoryManager
}) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
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
      
      <div>
        <h3 className="text-sm font-medium mb-2">Categoria</h3>
        <Select value={categoryFilter} onValueChange={handleCategoryChange}>
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
      </div>
      
      {/* Mobile category management button */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={openCategoryManager}
      >
        <Edit className="h-4 w-4 mr-2" />
        Gestisci Categorie
      </Button>
    </div>
  );
};

export default MobileProductsFilter;
