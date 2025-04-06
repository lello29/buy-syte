
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VariantOption from "./VariantOption";

interface VariantItemProps {
  variant: any;
  index: number;
  removeVariant: (index: number) => void;
  addVariantOption: (variantIndex: number) => void;
  removeVariantOption: (variantIndex: number, optionIndex: number) => void;
  updateVariantOption: (variantIndex: number, optionIndex: number, field: string, value: any) => void;
}

const VariantItem: React.FC<VariantItemProps> = ({
  variant,
  index,
  removeVariant,
  addVariantOption,
  removeVariantOption,
  updateVariantOption
}) => {
  return (
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
          {variant.options.map((option: any, optionIndex: number) => (
            <VariantOption
              key={optionIndex}
              variant={variant}
              index={index}
              optionIndex={optionIndex}
              updateVariantOption={updateVariantOption}
              removeVariantOption={removeVariantOption}
            />
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
  );
};

export default VariantItem;
