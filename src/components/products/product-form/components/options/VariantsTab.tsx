
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { Shirt, Palette, Scale } from "lucide-react";
import VariantItem from "./VariantItem";
import VariantTypeButton from "./VariantTypeButton";

const VARIANT_TYPES = [
  { id: "size", label: "Taglia", icon: Shirt },
  { id: "color", label: "Colore", icon: Palette },
  { id: "weight", label: "Peso/Volume", icon: Scale },
];

interface VariantsTabProps {
  variants: any[];
  addVariant: (typeId: string) => void;
  removeVariant: (index: number) => void;
  addVariantOption: (variantIndex: number) => void;
  removeVariantOption: (variantIndex: number, optionIndex: number) => void;
  updateVariantOption: (variantIndex: number, optionIndex: number, field: string, value: any) => void;
}

const VariantsTab: React.FC<VariantsTabProps> = ({
  variants,
  addVariant,
  removeVariant,
  addVariantOption,
  removeVariantOption,
  updateVariantOption
}) => {
  return (
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
                <VariantItem
                  key={variant.id}
                  variant={variant}
                  index={index}
                  removeVariant={removeVariant}
                  addVariantOption={addVariantOption}
                  removeVariantOption={removeVariantOption}
                  updateVariantOption={updateVariantOption}
                />
              ))}
            </Accordion>
          )}

          <Separator className="my-4" />
          
          <div className="grid grid-cols-3 gap-2">
            {VARIANT_TYPES.map((type) => (
              <VariantTypeButton
                key={type.id}
                type={type}
                onClick={() => addVariant(type.id)}
                disabled={variants.some(v => v.type === type.id)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VariantsTab;
