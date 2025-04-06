
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Scan } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { generateUniqueCode } from "../utils/barcodeUtils";

const formSchema = z.object({
  sku: z.string().optional(),
  barcode: z.string().optional(),
});

type IdentificationFormValues = z.infer<typeof formSchema>;

interface IdentificationTabProps {
  form: UseFormReturn<IdentificationFormValues>;
  onScanBarcode: () => void;
  onSearchBarcode: () => void;
}

const IdentificationTab: React.FC<IdentificationTabProps> = ({ 
  form, 
  onScanBarcode, 
  onSearchBarcode 
}) => {
  const handleGenerateCode = () => {
    const uniqueCode = generateUniqueCode();
    form.setValue("barcode", uniqueCode);
    form.setValue("sku", form.getValues("sku") || uniqueCode);
  };

  return (
    <>
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
                  onClick={onScanBarcode}
                >
                  <Scan className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between mt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={onSearchBarcode}
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
    </>
  );
};

export default IdentificationTab;
