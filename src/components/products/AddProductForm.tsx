
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ArrowRight, 
  ArrowLeft, 
  Save,
  ImagePlus,
  Check,
  Package,
  Settings,
  Tag,
  Info,
  Barcode,
  ShoppingBag,
  Scan
} from "lucide-react";
import { toast } from "sonner";
import ProductBasicInfo from "./product-form/ProductBasicInfo";
import ProductDetails from "./product-form/ProductDetails";
import ProductImages from "./product-form/ProductImages";
import ProductOptions from "./product-form/ProductOptions";
import ProductPublish from "./product-form/ProductPublish";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Product } from "@/types";

type ProductFormData = Partial<Product> & {
  variants?: {
    name: string;
    options: { value: string; price?: number; stock?: number }[];
  }[];
  sellingOptions?: {
    isOnlinePurchase: boolean;
    isReservationOnly: boolean;
    isInStoreOnly: boolean;
  };
  seo?: {
    keywords: string[];
    optimizedTitle: string;
  };
  images: (string | File)[];
  isSharedProduct?: boolean; // Flag to indicate if this is a product from the shared database
  barcode?: string; // Add the barcode property to fix the first error
}

const STEPS = [
  { id: "barcode", label: "Codice", icon: Barcode, subtitle: "Inizia con un codice" },
  { id: "basic-info", label: "Info base", icon: Info, subtitle: "Titolo e prezzo" },
  { id: "details", label: "Dettagli", icon: Package, subtitle: "Specifiche prodotto" },
  { id: "images", label: "Immagini", icon: ImagePlus, subtitle: "Foto e media" },
  { id: "options", label: "Opzioni", icon: Settings, subtitle: "Varianti e vendita" },
  { id: "publish", label: "Pubblica", icon: ShoppingBag, subtitle: "Finalizza e pubblica" }
];

const AddProductForm: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0,
    images: [],
    variants: [],
    sellingOptions: {
      isOnlinePurchase: true,
      isReservationOnly: false,
      isInStoreOnly: false
    },
    isActive: true,
    isSharedProduct: false
  });
  
  const [showHelp, setShowHelp] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateProductData = (data: Partial<ProductFormData>) => {
    setProductData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    // Check if this is a new product to potentially share
    const isNewBarcode = productData.barcode && !productData.isSharedProduct;
    
    toast.loading("Salvataggio in corso...");
    
    setTimeout(() => {
      // Here would be the API call to save the product
      toast.dismiss();
      toast.success("Prodotto salvato con successo!");
      
      // Notify if product will be shared with admin
      if (isNewBarcode) {
        toast.info("Il codice di questo prodotto è stato aggiunto all'archivio riservato e sarà verificato dall'amministratore");
      }
      
      console.log("Product data:", productData);
      
      // Close the modal or redirect
      if (onClose) onClose();
    }, 1500);
  };

  const handleSkipToManualEntry = () => {
    setCurrentStep(1); // Skip to basic info step
    toast.info("Procedi con l'inserimento manuale del prodotto");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {currentStep === 0 ? "Inizia l'inserimento del prodotto" : `Passo ${currentStep + 1}/${STEPS.length}: ${STEPS[currentStep].label}`}
        </h2>
        
        <Sheet open={showHelp} onOpenChange={setShowHelp}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">Aiuto</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Guida all'inserimento prodotti</SheetTitle>
              <SheetDescription>
                Come inserire al meglio i tuoi prodotti
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Metodi di inserimento</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li><strong>Scansione codice a barre:</strong> Più veloce se il prodotto è già nel database</li>
                  <li><strong>Inserimento manuale:</strong> Completo controllo sui dettagli del prodotto</li>
                  <li><strong>Generazione codice:</strong> Per prodotti senza codice EAN esistente</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Suggerimenti</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Foto di qualità aumentano le vendite del 30%</li>
                  <li>Descrizioni dettagliate riducono i resi e aumentano la soddisfazione</li>
                  <li>Imposta correttamente le varianti per facilitare gli acquisti</li>
                  <li>Specifica le opzioni di vendita per chiarire come il cliente può acquistare</li>
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <Tabs 
        value={STEPS[currentStep].id} 
        className="w-full"
        onValueChange={(value) => {
          const index = STEPS.findIndex(step => step.id === value);
          if (index !== -1) setCurrentStep(index);
        }}
      >
        <TabsList className={`w-full grid grid-cols-${STEPS.length} mb-6`}>
          {STEPS.map((step, index) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              className={`flex flex-col items-center py-2 ${isMobile ? 'text-xs' : ''}`}
              disabled={index > currentStep}
            >
              {!isMobile && (
                <div className="text-center">
                  <span className="block mb-1">{step.label}</span>
                  <span className="text-xs text-muted-foreground">{step.subtitle}</span>
                </div>
              )}
              <step.icon className={`h-5 w-5 ${isMobile ? 'mb-0' : 'my-1'}`} />
              {isMobile && <span className="text-[10px] mt-1">{step.label}</span>}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="p-4 border rounded-lg mb-4">
          <TabsContent value="barcode">
            <div className="space-y-6">
              <div className="text-center py-4">
                <Barcode className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-medium mb-2">Inizia con un codice a barre</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Scansiona il codice a barre del prodotto per cercarlo nel database centrale e velocizzare l'inserimento.
                </p>
                
                <div className="flex flex-col space-y-3 justify-center items-center">
                  <Button 
                    onClick={() => {
                      const barcodeStep = STEPS.findIndex(step => step.id === "details");
                      setCurrentStep(barcodeStep);
                    }}
                    className="w-full max-w-xs"
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Scansiona codice a barre
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleSkipToManualEntry}
                    className="w-full max-w-xs"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Inserisci prodotto manualmente
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-8">
                  Nota: i prodotti con codice a barre vengono salvati in un archivio condiviso per facilitare l'inserimento da parte di altri utenti.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="basic-info">
            <ProductBasicInfo 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="details">
            <ProductDetails 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="images">
            <ProductImages 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="options">
            <ProductOptions 
              data={productData} 
              updateData={updateProductData} 
            />
          </TabsContent>
          
          <TabsContent value="publish">
            <ProductPublish 
              data={productData}
              updateData={updateProductData}
              onSubmit={handleSubmit}
            />
          </TabsContent>
        </div>

        <div className="flex justify-between mt-4">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Precedente
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext}>
              Successivo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Salva Prodotto
            </Button>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default AddProductForm;
