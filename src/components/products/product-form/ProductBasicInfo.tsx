
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wand } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Il nome deve avere almeno 3 caratteri"),
  description: z.string().min(10, "La descrizione deve avere almeno 10 caratteri"),
  category: z.string().min(1, "Seleziona una categoria"),
  price: z.coerce.number().positive("Il prezzo deve essere maggiore di zero"),
});

const CATEGORIES = [
  "Abbigliamento",
  "Alimentari",
  "Arredamento",
  "Elettronica",
  "Giocattoli",
  "Libri",
  "Musica",
  "Sport",
  "Altro",
];

interface ProductBasicInfoProps {
  data: any;
  updateData: (data: any) => void;
}

const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ data, updateData }) => {
  const [useAI, setUseAI] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || "",
      description: data.description || "",
      category: data.category || "",
      price: data.price || 0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateData(values);
  };

  const handleAIGenerate = async () => {
    // This would call an AI service to generate product details
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const aiGeneratedData = {
        name: "Smart TV 4K Ultra HD",
        description: "Smart TV 4K con tecnologia LED, HDR e sistema operativo integrato. Esperienza visiva straordinaria con colori vividi e dettagli nitidi. Compatibile con tutti i servizi di streaming più popolari.",
        category: "Elettronica",
        price: 699.99,
      };
      
      form.reset(aiGeneratedData);
      updateData(aiGeneratedData);
      toast.success("Dati generati con intelligenza artificiale");
    } catch (error) {
      toast.error("Errore nella generazione dei dati");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Informazioni Base</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Usa AI</span>
          <Switch 
            checked={useAI} 
            onCheckedChange={setUseAI} 
          />
        </div>
      </div>

      {useAI && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleAIGenerate}
          disabled={isGenerating}
        >
          <Wand className="mr-2 h-4 w-4" />
          {isGenerating ? "Generazione in corso..." : "Genera con AI"}
        </Button>
      )}

      <Form {...form}>
        <form onChange={() => onSubmit(form.getValues())} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Prodotto*</FormLabel>
                <FormControl>
                  <Input placeholder="Inserisci il nome del prodotto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrizione*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Inserisci la descrizione del prodotto"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona una categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prezzo (€)*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductBasicInfo;
