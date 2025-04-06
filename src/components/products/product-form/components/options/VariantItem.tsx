
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VariantOption from "./VariantOption";

interface VariantItemProps {
  variant: any;
  variantIndex: number;
  onRemove: () => void;
  onAddOption: () => void;
  onRemoveOption: (optionIndex: number) => void;
  onUpdateOption: (optionIndex: number, field: string, value: any) => void;
}

const VariantItem: React.FC<VariantItemProps> = ({
  variant,
  variantIndex,
  onRemove,
  onAddOption,
  onRemoveOption,
  onUpdateOption
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
            onRemove();
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
              index={variantIndex}
              optionIndex={optionIndex}
              updateVariantOption={(variantIndex, optionIndex, field, value) => 
                onUpdateOption(optionIndex, field, value)
              }
              removeVariantOption={(variantIndex, optionIndex) => 
                onRemoveOption(optionIndex)
              }
            />
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddOption()}
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
