
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
import { Scan, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProductBasicInfoProps {
  data: any;
  updateData: (data: any) => void;
  onScanBarcode?: () => void;
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

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ 
  data, 
  updateData, 
  onScanBarcode 
}) => {
  const { getErrorForField, currentStep } = useProductForm();
  const [aiDescriptionStatus, setAiDescriptionStatus] = React.useState<'loading' | 'error' | 'success' | 'idle'>('idle');
  
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

  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ barcode: e.target.value });
  };

  const generateDescriptionWithAI = () => {
    // Simuliamo una generazione AI sulla base dei dati disponibili
    if (!data.name) {
      return;
    }
    
    setAiDescriptionStatus('loading');
    
    // Simulazione della chiamata API all'AI
    setTimeout(() => {
      try {
        // Genera una descrizione basata sul nome e categoria
        const category = data.category || "prodotto";
        const generatedDescription = `${data.name} è un ${category.toLowerCase()} di alta qualità. Questo prodotto offre un eccellente rapporto qualità-prezzo ed è adatto a diverse esigenze. Le caratteristiche principali includono design ergonomico e materiali durevoli.`;
        
        updateData({ description: generatedDescription });
        setAiDescriptionStatus('success');
      } catch (error) {
        console.error("Errore nella generazione della descrizione con AI:", error);
        setAiDescriptionStatus('error');
      }
    }, 1500);
  };

  // Verifica AI status quando il nome e la categoria vengono aggiornati
  React.useEffect(() => {
    if (data.name && data.category && !data.description && aiDescriptionStatus === 'idle') {
      generateDescriptionWithAI();
    }
  }, [data.name, data.category]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Informazioni di base</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="product-barcode" className="block text-sm font-medium text-gray-700">
            Codice a Barre <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              id="product-barcode"
              placeholder="Inserisci o scansiona codice"
              value={data.barcode || ""}
              onChange={handleBarcodeChange}
              className={getErrorForField("barcode") ? "border-red-500" : ""}
            />
            {onScanBarcode && (
              <Button type="button" variant="outline" size="icon" onClick={onScanBarcode}>
                <Scan className="h-4 w-4" />
              </Button>
            )}
          </div>
          {getErrorForField("barcode") && (
            <p className="text-sm font-medium text-destructive">{getErrorForField("barcode")?.message}</p>
          )}
        </div>
        
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
        
        <div className="space-y-2">
          <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            Descrizione
            {aiDescriptionStatus === 'loading' && (
              <span className="text-xs text-blue-500">(Generazione con AI in corso...)</span>
            )}
            {aiDescriptionStatus === 'success' && (
              <span className="text-xs text-green-500">(Generata con AI)</span>
            )}
          </label>
          
          {aiDescriptionStatus === 'error' && (
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Impossibile generare descrizione con AI. Inserisci manualmente.
              </AlertDescription>
            </Alert>
          )}
          
          <Textarea
            id="product-description"
            placeholder="Descrizione del prodotto"
            value={data.description || ""}
            onChange={handleDescriptionChange}
            rows={4}
          />
          
          {!data.description && aiDescriptionStatus !== 'loading' && (
            <Button
              type="button" 
              variant="outline" 
              size="sm"
              onClick={generateDescriptionWithAI}
              className="mt-2"
            >
              Genera descrizione con AI
            </Button>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>I campi contrassegnati con <span className="text-red-500">*</span> sono obbligatori</p>
        </div>
      </div>
    </div>
  );
};

export default ProductBasicInfo;
