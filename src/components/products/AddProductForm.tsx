
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
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

  // Desktop layout rendering
  const renderDesktopLayout = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {currentStep === 0 ? "Inserimento Prodotto" : `${STEPS[currentStep].label}`}
        </h2>
        
        <div className="flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Navigazione Rapida</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {STEPS.map((step, index) => (
                      <li key={step.id}>
                        <NavigationMenuLink asChild>
                          <Button 
                            variant="ghost" 
                            onClick={() => setCurrentStep(index)}
                            disabled={index > currentStep}
                            className="w-full justify-start"
                          >
                            <step.icon className="mr-2 h-4 w-4" />
                            <div className="flex flex-col items-start">
                              <span>{step.label}</span>
                              <span className="text-xs text-muted-foreground">{step.subtitle}</span>
                            </div>
                          </Button>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Sheet open={showHelp} onOpenChange={setShowHelp}>
            <SheetTrigger asChild>
              <Button variant="outline">Aiuto</Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
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
      </div>
      
      <div className="flex gap-6">
        <div className="w-64 shrink-0 hidden md:block">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <ul className="space-y-2">
              {STEPS.map((step, index) => (
                <li key={step.id}>
                  <Button
                    variant={currentStep === index ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => index <= currentStep && setCurrentStep(index)}
                    disabled={index > currentStep}
                  >
                    <div className="flex items-center w-full">
                      <div className={`flex items-center justify-center h-6 w-6 rounded-full mr-2 ${
                        currentStep > index 
                          ? "bg-primary/20 text-primary" 
                          : currentStep === index 
                            ? "bg-primary text-white" 
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {currentStep > index ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <span>{step.label}</span>
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white border rounded-lg p-6">
            <TabsContent value={STEPS[currentStep].id} className="mt-0">
              {currentStep === 0 ? (
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
              ) : currentStep === 1 ? (
                <ProductBasicInfo 
                  data={productData} 
                  updateData={updateProductData} 
                />
              ) : currentStep === 2 ? (
                <ProductDetails 
                  data={productData} 
                  updateData={updateProductData} 
                />
              ) : currentStep === 3 ? (
                <ProductImages 
                  data={productData} 
                  updateData={updateProductData} 
                />
              ) : currentStep === 4 ? (
                <ProductOptions 
                  data={productData} 
                  updateData={updateProductData} 
                />
              ) : (
                <ProductPublish 
                  data={productData}
                  updateData={updateProductData}
                  onSubmit={handleSubmit}
                />
              )}
            </TabsContent>
          </div>
          
          <div className="flex justify-between mt-6">
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
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Salva Prodotto
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );

  // Mobile layout rendering
  const renderMobileLayout = () => (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {currentStep === 0 ? "Inserimento" : STEPS[currentStep].label}
          </h2>
          
          <Sheet open={showHelp} onOpenChange={setShowHelp}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">Aiuto</Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Guida all'inserimento</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Metodi di inserimento</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li><strong>Scansione codice:</strong> Veloce per prodotti esistenti</li>
                    <li><strong>Inserimento manuale:</strong> Controllo completo</li>
                    <li><strong>Generazione codice:</strong> Per prodotti senza codice</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Suggerimenti</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Foto di qualità aumentano le vendite del 30%</li>
                    <li>Descrizioni dettagliate riducono i resi</li>
                    <li>Imposta correttamente le varianti</li>
                  </ul>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="overflow-x-auto pb-2 mt-2">
          <div className="flex space-x-1">
            {STEPS.map((step, index) => (
              <Button
                key={step.id}
                variant={currentStep === index ? "default" : "outline"}
                size="sm"
                className={`flex flex-col px-2 py-1 min-w-[60px] h-auto ${
                  index > currentStep ? "opacity-50" : ""
                }`}
                onClick={() => index <= currentStep && setCurrentStep(index)}
                disabled={index > currentStep}
              >
                <step.icon className="h-4 w-4 mb-1" />
                <span className="text-[10px]">{step.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-4">
        <TabsContent value={STEPS[currentStep].id} className="m-0 p-4">
          {currentStep === 0 ? (
            <div className="space-y-4">
              <div className="text-center py-2">
                <Barcode className="h-12 w-12 mx-auto mb-3 text-primary" />
                <h3 className="text-lg font-medium mb-2">Codice a barre</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Scansiona per cercare nel database centrale
                </p>
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={() => {
                      const barcodeStep = STEPS.findIndex(step => step.id === "details");
                      setCurrentStep(barcodeStep);
                    }}
                    size="sm"
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Scansiona
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleSkipToManualEntry}
                    size="sm"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    Inserimento manuale
                  </Button>
                </div>
                
                <p className="text-[10px] text-muted-foreground mt-4">
                  Prodotti con codice a barre vengono salvati in archivio condiviso
                </p>
              </div>
            </div>
          ) : currentStep === 1 ? (
            <ProductBasicInfo 
              data={productData} 
              updateData={updateProductData} 
            />
          ) : currentStep === 2 ? (
            <ProductDetails 
              data={productData} 
              updateData={updateProductData} 
            />
          ) : currentStep === 3 ? (
            <ProductImages 
              data={productData} 
              updateData={updateProductData} 
            />
          ) : currentStep === 4 ? (
            <ProductOptions 
              data={productData} 
              updateData={updateProductData} 
            />
          ) : (
            <ProductPublish 
              data={productData}
              updateData={updateProductData}
              onSubmit={handleSubmit}
            />
          )}
        </TabsContent>
      </div>
      
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="sm"
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Indietro
        </Button>
        
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={handleNext} size="sm">
            Avanti
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} size="sm" className="bg-green-600 hover:bg-green-700">
            <Save className="mr-1 h-4 w-4" />
            Salva
          </Button>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={STEPS[currentStep].id}>
        {isMobile ? renderMobileLayout() : renderDesktopLayout()}
      </Tabs>
    </div>
  );
};

export default AddProductForm;
