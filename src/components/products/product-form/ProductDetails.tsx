
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, Barcode } from "lucide-react";
import { toast } from "sonner";
import BarcodeScanner from "@/components/products/barcode/BarcodeScanner";
import InventoryTab from "./components/InventoryTab";
import IdentificationTab from "./components/IdentificationTab";
import TechnicalSpecsTab from "./components/TechnicalSpecsTab";
import ProductFoundDialog from "./components/ProductFoundDialog";
import { searchProductByBarcode } from "./utils/barcodeUtils";

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
  isMobile?: boolean;
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

  const handleSearchBarcode = async (barcodeValue?: string) => {
    const codeToSearch = barcodeValue || form.getValues("barcode");
    
    if (!codeToSearch) {
      toast.error("Inserisci un codice a barre prima di cercare");
      return;
    }

    try {
      const productData = await searchProductByBarcode(codeToSearch);
      setFoundProduct(productData);
      setShowProductDialog(true);
    } catch (error) {
      // Error handling is done in the searchProductByBarcode function
    }
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
                <InventoryTab form={form} />
              </TabsContent>

              <TabsContent value="identification">
                <IdentificationTab 
                  form={form} 
                  onScanBarcode={handleScanBarcode}
                  onSearchBarcode={() => handleSearchBarcode()}
                />
              </TabsContent>

              <TabsContent value="technical">
                <TechnicalSpecsTab form={form} />
              </TabsContent>
            </form>
          </Form>
        </div>
      </Tabs>

      {/* Product Found Dialog */}
      <ProductFoundDialog 
        open={showProductDialog}
        onOpenChange={setShowProductDialog}
        foundProduct={foundProduct}
        onAccept={handleAcceptProduct}
        onReject={handleRejectProduct}
      />

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
