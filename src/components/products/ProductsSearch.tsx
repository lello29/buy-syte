
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductsSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ProductsSearch: React.FC<ProductsSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-2 rounded-lg border">
      <Search className="h-5 w-5 text-gray-400" />
      <Input
        placeholder="Cerca prodotti per nome o categoria..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-0 focus-visible:ring-0 flex-1"
      />
    </div>
  );
};

export default ProductsSearch;
