
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  ShoppingCart,
  Phone,
  Store,
  Plus,
  Trash,
  Calendar,
  Shirt,
  Palette,
  Scale,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductOptionsProps {
  data: any;
  updateData: (data: any) => void;
}

const VARIANT_TYPES = [
  { id: "size", label: "Taglia", icon: Shirt },
  { id: "color", label: "Colore", icon: Palette },
  { id: "weight", label: "Peso/Volume", icon: Scale },
];

const ProductOptions: React.FC<ProductOptionsProps> = ({ data, updateData }) => {
  const [sellingOptions, setSellingOptions] = useState({
    isOnlinePurchase: data.sellingOptions?.isOnlinePurchase ?? true,
    isReservationOnly: data.sellingOptions?.isReservationOnly ?? false,
    isInStoreOnly: data.sellingOptions?.isInStoreOnly ?? false,
  });
  
  const [variants, setVariants] = useState(data.variants || []);
  const [publicationDate, setPublicationDate] = useState<Date | undefined>(
    data.publicationDate ? new Date(data.publicationDate) : undefined
  );
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(
    data.expirationDate ? new Date(data.expirationDate) : undefined
  );
  const [location, setLocation] = useState(data.location || "");

  const updateSellingOptions = (newOptions: any) => {
    const updated = { ...sellingOptions, ...newOptions };
    setSellingOptions(updated);
    updateData({ sellingOptions: updated });
  };

  const addVariant = (typeId: string) => {
    const type = VARIANT_TYPES.find(t => t.id === typeId);
    if (!type) return;

    const newVariant = {
      id: `variant-${Date.now()}`,
      type: typeId,
      name: type.label,
      options: [{ value: "", price: undefined, stock: undefined }]
    };
    
    const newVariants = [...variants, newVariant];
    setVariants(newVariants);
    updateData({ variants: newVariants });
  };

  const removeVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
    updateData({ variants: newVariants });
  };

  const addVariantOption = (variantIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.push({ value: "", price: undefined, stock: undefined });
    setVariants(newVariants);
    updateData({ variants: newVariants });
  };

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options.splice(optionIndex, 1);
    setVariants(newVariants);
    updateData({ variants: newVariants });
  };

  const updateVariantOption = (variantIndex: number, optionIndex: number, field: string, value: any) => {
    const newVariants = [...variants];
    newVariants[variantIndex].options[optionIndex][field] = value;
    setVariants(newVariants);
    updateData({ variants: newVariants });
  };

  const handlePublicationDateChange = (date: Date | undefined) => {
    setPublicationDate(date);
    updateData({ publicationDate: date?.toISOString() });
  };

  const handleExpirationDateChange = (date: Date | undefined) => {
    setExpirationDate(date);
    updateData({ expirationDate: date?.toISOString() });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    updateData({ location: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Opzioni di vendita</h3>

      <Tabs defaultValue="selling-options">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="selling-options">Modalità</TabsTrigger>
          <TabsTrigger value="variants">Varianti</TabsTrigger>
          <TabsTrigger value="advanced">Avanzate</TabsTrigger>
        </TabsList>

        <TabsContent value="selling-options" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Modalità di vendita</CardTitle>
              <CardDescription>
                Scegli come i clienti possono acquistare il prodotto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <Label htmlFor="online-purchase">Acquisto online</Label>
                </div>
                <Switch
                  id="online-purchase"
                  checked={sellingOptions.isOnlinePurchase}
                  onCheckedChange={(checked) => updateSellingOptions({ isOnlinePurchase: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <Label htmlFor="reservation-only">Solo prenotazione</Label>
                </div>
                <Switch
                  id="reservation-only"
                  checked={sellingOptions.isReservationOnly}
                  onCheckedChange={(checked) => updateSellingOptions({ isReservationOnly: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Store className="h-4 w-4" />
                  <Label htmlFor="in-store-only">Solo vendita in negozio</Label>
                </div>
                <Switch
                  id="in-store-only"
                  checked={sellingOptions.isInStoreOnly}
                  onCheckedChange={(checked) => updateSellingOptions({ isInStoreOnly: checked })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Puoi attivare più modalità contemporaneamente
              </p>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle>Posizione prodotto</CardTitle>
              <CardDescription>
                Seleziona in quale negozio o sede è disponibile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={location} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona sede" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sede-principale">Sede principale</SelectItem>
                  <SelectItem value="sede-secondaria">Sede secondaria</SelectItem>
                  <SelectItem value="magazzino">Solo magazzino</SelectItem>
                  <SelectItem value="tutte">Tutte le sedi</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Varianti prodotto</CardTitle>
              <CardDescription>
                Aggiungi varianti come taglie, colori o pesi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {variants.length === 0 ? (
                  <div className="text-center p-6 border rounded-md">
                    <p className="text-muted-foreground mb-2">Nessuna variante configurata</p>
                    <p className="text-sm text-muted-foreground">
                      Aggiungi varianti per prodotti disponibili in diverse opzioni
                    </p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {variants.map((variant, index) => (
                      <AccordionItem key={variant.id} value={variant.id}>
                        <div className="flex items-center justify-between">
                          <AccordionTrigger className="flex-1">
                            {variant.name} ({variant.options.length})
                          </AccordionTrigger>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVariant(index);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                        <AccordionContent>
                          <div className="space-y-4 pt-2">
                            {variant.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="grid grid-cols-12 gap-2">
                                <div className="col-span-4">
                                  <Input
                                    placeholder={`Valore ${variant.name}`}
                                    value={option.value || ''}
                                    onChange={(e) => updateVariantOption(index, optionIndex, 'value', e.target.value)}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <Input
                                    type="number"
                                    placeholder="Prezzo"
                                    value={option.price || ''}
                                    onChange={(e) => updateVariantOption(index, optionIndex, 'price', parseFloat(e.target.value))}
                                  />
                                </div>
                                <div className="col-span-3">
                                  <Input
                                    type="number"
                                    placeholder="Quantità"
                                    value={option.stock || ''}
                                    onChange={(e) => updateVariantOption(index, optionIndex, 'stock', parseInt(e.target.value))}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-full w-full"
                                    onClick={() => removeVariantOption(index, optionIndex)}
                                    disabled={variant.options.length <= 1}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addVariantOption(index)}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Aggiungi opzione
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}

                <Separator className="my-4" />
                
                <div className="grid grid-cols-3 gap-2">
                  {VARIANT_TYPES.map((type) => (
                    <Button
                      key={type.id}
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={() => addVariant(type.id)}
                      disabled={variants.some(v => v.type === type.id)}
                    >
                      <type.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs">{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Programmazione</CardTitle>
              <CardDescription>
                Imposta quando il prodotto sarà visibile o nascosto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publish-date">Data di pubblicazione</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="publish-date"
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {publicationDate ? (
                          format(publicationDate, "PPP")
                        ) : (
                          <span>Seleziona data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={publicationDate}
                        onSelect={handlePublicationDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Data di scadenza</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="expiry-date"
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {expirationDate ? (
                          format(expirationDate, "PPP")
                        ) : (
                          <span>Seleziona data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={expirationDate}
                        onSelect={handleExpirationDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPublicationDate(undefined);
                    setExpirationDate(undefined);
                    updateData({ publicationDate: null, expirationDate: null });
                    toast.info("Date di programmazione rimosse");
                  }}
                >
                  Rimuovi programmazione
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductOptions;
