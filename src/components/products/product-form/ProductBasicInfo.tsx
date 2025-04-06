
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useProductForm } from "./ProductFormContext";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface ProductBasicInfoProps {
  data: any;
  updateData: (data: any) => void;
}

const CATEGORIES = [
  "Abbigliamento",
  "Accessori",
  "Arredamento",
  "Arte e Collezionismo",
  "Bellezza e Cura Personale",
  "Elettronica",
  "Food & Beverage",
  "Gioielli",
  "Libri e Media",
  "Salute e Benessere",
  "Sport e Tempo Libero",
  "Altro"
];

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ data, updateData }) => {
  const { getErrorForField } = useProductForm();
  
  // Inizializza il form con i dati correnti
  const form = useForm({
    defaultValues: {
      name: data.name || "",
      description: data.description || "",
      price: data.price || 0,
      category: data.category || ""
    }
  });
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateData({ description: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    updateData({ price: value });
  };

  const handleCategoryChange = (value: string) => {
    updateData({ category: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Informazioni di base</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
            Nome Prodotto <span className="text-red-500">*</span>
          </label>
          <Input
            id="product-name"
            placeholder="Nome del prodotto"
            value={data.name || ""}
            onChange={handleNameChange}
            className={getErrorForField("name") ? "border-red-500" : ""}
          />
          {getErrorForField("name") && (
            <p className="text-sm font-medium text-destructive">{getErrorForField("name")?.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
            Descrizione
          </label>
          <Textarea
            id="product-description"
            placeholder="Descrizione del prodotto"
            value={data.description || ""}
            onChange={handleDescriptionChange}
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
              Prezzo <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                €
              </span>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={data.price || ""}
                onChange={handlePriceChange}
                className={`pl-8 ${getErrorForField("price") ? "border-red-500" : ""}`}
              />
            </div>
            {getErrorForField("price") && (
              <p className="text-sm font-medium text-destructive">{getErrorForField("price")?.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="product-category" className="block text-sm font-medium text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </label>
            <Select 
              value={data.category || ""} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="product-category" className={getErrorForField("category") ? "border-red-500" : ""}>
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {getErrorForField("category") && (
              <p className="text-sm font-medium text-destructive">{getErrorForField("category")?.message}</p>
            )}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>I campi contrassegnati con <span className="text-red-500">*</span> sono obbligatori</p>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
