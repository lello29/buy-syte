
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VARIANT_TYPES } from "./constants";
import VariantTypeButton from "./VariantTypeButton";
import VariantItem from "./VariantItem";

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
  updateVariantOption,
}) => {
  const availableVariantTypes = VARIANT_TYPES.filter(
    (type) => !variants.some((v) => v.type === type.id)
  );

  return (
    <div className="space-y-4">
      {variants.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed rounded-md">
          <p className="text-muted-foreground mb-4">
            Aggiungi varianti al prodotto come taglia, colore o peso
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {VARIANT_TYPES.map((type) => (
              <VariantTypeButton
                key={type.id}
                type={type}
                onClick={() => addVariant(type.id)}
                disabled={false}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {variants.map((variant, variantIndex) => (
              <VariantItem
                key={variantIndex}
                variant={variant}
                variantIndex={variantIndex}
                onRemove={() => removeVariant(variantIndex)}
                onAddOption={() => addVariantOption(variantIndex)}
                onRemoveOption={(optionIndex) =>
                  removeVariantOption(variantIndex, optionIndex)
                }
                onUpdateOption={(optionIndex, field, value) =>
                  updateVariantOption(variantIndex, optionIndex, field, value)
                }
              />
            ))}
          </div>

          {availableVariantTypes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Aggiungi un'altra variante:
              </p>
              <div className="flex flex-wrap gap-2">
                {availableVariantTypes.map((type) => (
                  <VariantTypeButton
                    key={type.id}
                    type={type}
                    onClick={() => addVariant(type.id)}
                    disabled={false}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VariantsTab;
