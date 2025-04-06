import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Barcode, Scan, Tag, AlertCircle, Check, X } from "lucide-react";
import { toast } from "sonner";
import BarcodeScanner from "@/components/products/barcode/BarcodeScanner";

const formSchema = z.object({
  sku: z.string().optional(),
  barcode: z.string().optional(),
  inventory: z.coerce.number().nonnegative("La quantità non può essere negativa"),
  weight: z.coerce.number().optional(),
  dimensions: z.string().optional(),
  technicalSpecs: z.string().optional(),
});

interface ProductDetailsProps {
  data: any;
  updateData: (data: any) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ data, updateData }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [foundProduct, setFoundProduct] = useState<any>(null);
  const [showProductDialog, setShowProductDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sku: data.sku || "",
      barcode: data.barcode || "",
      inventory: data.inventory || 0,
      weight: data.weight || 0,
      dimensions: data.dimensions || "",
      technicalSpecs: data.technicalSpecs || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
  };

  const handleScanBarcode = () => {
    setShowScanner(true);
  };

  const handleBarcodeDetected = (barcodeValue: string) => {
    form.setValue("barcode", barcodeValue);
    setShowScanner(false);
    toast.success("Codice a barre scansionato con successo");
    onSubmit(form.getValues());
    
    // After scanning, search for the product
    handleSearchBarcode(barcodeValue);
  };

  const handleSearchBarcode = (barcodeValue?: string) => {
    const codeToSearch = barcodeValue || form.getValues("barcode");
    
    if (!codeToSearch) {
      toast.error("Inserisci un codice a barre prima di cercare");
      return;
    }

    toast.loading("Ricerca prodotto nell'archivio centrale...");
    
    // Simulate product search in the shared database
    setTimeout(() => {
      if (codeToSearch.startsWith("8001") || codeToSearch.startsWith("978")) {
        // Product found in the central database
        const productData = {
          name: "Pasta Barilla Spaghetti N.5",
          description: "Pasta di semola di grano duro",
          category: "Alimentari",
          price: 1.29,
          inventory: 50,
          weight: 0.5,
          dimensions: "10x5x20 cm",
          sku: "BARILLA-SPA5",
          barcode: codeToSearch
        };
        
        setFoundProduct(productData);
        setShowProductDialog(true);
        toast.dismiss();
      } else {
        toast.error("Nessun prodotto trovato con questo codice");
        toast.info("Puoi inserire manualmente i dettagli del prodotto");
      }
    }, 1500);
  };

  const handleAcceptProduct = () => {
    if (foundProduct) {
      updateData(foundProduct);
      
      // Update form values to match the found product
      Object.entries(foundProduct).forEach(([key, value]) => {
        if (form.getValues(key as any) !== undefined) {
          form.setValue(key as any, value as any);
        }
      });
      
      setShowProductDialog(false);
      toast.success("Prodotto importato con successo");
    }
  };

  const handleRejectProduct = () => {
    setShowProductDialog(false);
    toast.info("Procedere con inserimento manuale");
  };

  const handleGenerateCode = () => {
    // Generate a unique code for the product
    const uniqueCode = "SHOP" + Date.now().toString().slice(-8);
    form.setValue("barcode", uniqueCode);
    form.setValue("sku", data.sku || uniqueCode);
    
    toast.success("Codice generato con successo");
    onSubmit(form.getValues());
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Dettagli Prodotto</h3>
      
      <Tabs defaultValue="inventory">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">
            <Tag className="mr-2 h-4 w-4" />
            Inventario
          </TabsTrigger>
          <TabsTrigger value="identification">
            <Barcode className="mr-2 h-4 w-4" />
            Codici
          </TabsTrigger>
          <TabsTrigger value="technical">
            <span className="mr-2">📋</span>
            Specifiche
          </TabsTrigger>
        </TabsList>

        <div className="mt-4 p-4 border rounded-md">
          <Form {...form}>
            <form onChange={() => onSubmit(form.getValues())} className="space-y-4">
              <TabsContent value="inventory">
                <FormField
                  control={form.control}
                  name="inventory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantità disponibile</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Imposta a 0 per prodotti esauriti o non ancora disponibili
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Peso (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Dimensioni (LxAxP)</FormLabel>
                      <FormControl>
                        <Input placeholder="20x10x5 cm" {...field} />
                      </FormControl>
                      <FormDescription>
                        Formato consigliato: lunghezza x altezza x profondità
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="identification">
                <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Opzioni di identificazione prodotto
                  </h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Puoi identificare il prodotto in tre modi:
                  </p>
                  <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                    <li>Scansiona un codice a barre esistente</li>
                    <li>Inserisci manualmente un codice</li>
                    <li>Genera un nuovo codice univoco</li>
                  </ul>
                </div>

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Codice SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Codice stock" {...field} />
                      </FormControl>
                      <FormDescription>
                        Un codice univoco per identificare il prodotto nel tuo inventario
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Codice a barre / EAN</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Input placeholder="Es. 8001120329394" {...field} />
                          </FormControl>
                          <Button 
                            type="button" 
                            size="icon" 
                            variant="outline"
                            onClick={handleScanBarcode}
                          >
                            <Scan className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between mt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSearchBarcode()}
                          >
                            Cerca prodotto
                          </Button>
                          <Button 
                            type="button" 
                            variant="secondary" 
                            size="sm"
                            onClick={handleGenerateCode}
                          >
                            Genera codice
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="technical">
                <FormField
                  control={form.control}
                  name="technicalSpecs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specifiche Tecniche</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Inserisci specifiche tecniche, materiali, requisiti, ecc."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Per prodotti tecnici, inserisci dettagli sulle caratteristiche funzionali
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </form>
          </Form>
        </div>
      </Tabs>

      {/* Product Found Dialog */}
      <AlertDialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Prodotto trovato nell'archivio</AlertDialogTitle>
            <AlertDialogDescription>
              È questo il prodotto che stai cercando di aggiungere?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {foundProduct && (
            <div className="p-4 border rounded-md my-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">Nome:</div>
                <div>{foundProduct.name}</div>
                
                <div className="font-semibold">Categoria:</div>
                <div>{foundProduct.category}</div>
                
                <div className="font-semibold">Prezzo:</div>
                <div>€{foundProduct.price.toFixed(2)}</div>
                
                <div className="font-semibold">Codice:</div>
                <div>{foundProduct.barcode}</div>
              </div>
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleRejectProduct} className="flex items-center">
              <X className="mr-2 h-4 w-4" />
              No, inserisco manualmente
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAcceptProduct} className="flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Sì, importa questo prodotto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Barcode Scanner Component */}
      {showScanner && (
        <BarcodeScanner 
          onDetected={handleBarcodeDetected} 
          onClose={() => setShowScanner(false)} 
        />
      )}
    </div>
  );
};

export default ProductDetails;
