
import React from "react";
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
import { Barcode, Scan, Tag } from "lucide-react";
import { toast } from "sonner";

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
    // In a real app, this would access the camera and scan a barcode
    toast.info("Funzione di scansione in fase di sviluppo");
    
    // Simulate a successful scan
    setTimeout(() => {
      const mockedBarcodeData = "8001120329394";
      form.setValue("barcode", mockedBarcodeData);
      onSubmit(form.getValues());
      toast.success("Codice a barre scansionato con successo");
    }, 1000);
  };

  const handleSearchBarcode = () => {
    const barcodeValue = form.getValues("barcode");
    if (!barcodeValue) {
      toast.error("Inserisci un codice a barre prima di cercare");
      return;
    }

    toast.loading("Ricerca prodotto in corso...");
    
    // Simulate product search
    setTimeout(() => {
      if (barcodeValue === "8001120329394") {
        const productData = {
          name: "Pasta Barilla Spaghetti N.5",
          description: "Pasta di semola di grano duro",
          category: "Alimentari",
          price: 1.29,
          inventory: 50,
          weight: 0.5,
          dimensions: "10x5x20 cm",
          sku: "BARILLA-SPA5",
          barcode: barcodeValue
        };
        
        updateData(productData);
        toast.success("Prodotto trovato e importato");
      } else {
        toast.error("Nessun prodotto trovato con questo codice");
      }
    }, 1500);
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
                        <div className="flex justify-end mt-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={handleSearchBarcode}
                          >
                            Cerca prodotto
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
    </div>
  );
};

export default ProductDetails;
