
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  technicalSpecs: z.string().optional(),
});

type TechnicalSpecsFormValues = z.infer<typeof formSchema>;

interface TechnicalSpecsTabProps {
  form: UseFormReturn<TechnicalSpecsFormValues>;
}

const TechnicalSpecsTab: React.FC<TechnicalSpecsTabProps> = ({ form }) => {
  return (
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
  );
};

export default TechnicalSpecsTab;
