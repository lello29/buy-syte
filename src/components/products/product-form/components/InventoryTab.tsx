
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  inventory: z.coerce.number().nonnegative("La quantità non può essere negativa"),
  weight: z.coerce.number().optional(),
  dimensions: z.string().optional(),
});

type InventoryFormValues = z.infer<typeof formSchema>;

interface InventoryTabProps {
  form: UseFormReturn<InventoryFormValues>;
}

const InventoryTab: React.FC<InventoryTabProps> = ({ form }) => {
  return (
    <>
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
    </>
  );
};

export default InventoryTab;
