
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SellingOptionsTab from "./components/options/SellingOptionsTab";
import VariantsTab from "./components/options/VariantsTab";
import AdvancedTab from "./components/options/AdvancedTab";
import { VARIANT_TYPES } from "./components/options/constants";

interface ProductOptionsProps {
  data: any;
  updateData: (data: any) => void;
  isMobile?: boolean;
}

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
          <SellingOptionsTab
            sellingOptions={sellingOptions}
            updateSellingOptions={updateSellingOptions}
            location={location}
            handleLocationChange={handleLocationChange}
          />
        </TabsContent>

        <TabsContent value="variants" className="mt-4">
          <VariantsTab
            variants={variants}
            addVariant={addVariant}
            removeVariant={removeVariant}
            addVariantOption={addVariantOption}
            removeVariantOption={removeVariantOption}
            updateVariantOption={updateVariantOption}
          />
        </TabsContent>

        <TabsContent value="advanced" className="mt-4">
          <AdvancedTab
            publicationDate={publicationDate}
            expirationDate={expirationDate}
            handlePublicationDateChange={handlePublicationDateChange}
            handleExpirationDateChange={handleExpirationDateChange}
            updateData={updateData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductOptions;
