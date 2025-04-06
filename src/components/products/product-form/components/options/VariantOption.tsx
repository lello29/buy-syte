
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface VariantOptionProps {
  variant: any;
  index: number;
  optionIndex: number;
  updateVariantOption: (variantIndex: number, optionIndex: number, field: string, value: any) => void;
  removeVariantOption: (variantIndex: number, optionIndex: number) => void;
}

const VariantOption: React.FC<VariantOptionProps> = ({
  variant,
  index,
  optionIndex,
  updateVariantOption,
  removeVariantOption
}) => {
  const option = variant.options[optionIndex];
  
  return (
    <div className="grid grid-cols-12 gap-2">
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
  );
};

export default VariantOption;
