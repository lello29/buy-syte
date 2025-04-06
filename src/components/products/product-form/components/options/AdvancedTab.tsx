
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl 
} from "@/components/ui/form";
import DatePicker from "./DatePicker";

interface AdvancedTabProps {
  publicationDate: Date | undefined;
  expirationDate: Date | undefined;
  handlePublicationDateChange: (date: Date | undefined) => void;
  handleExpirationDateChange: (date: Date | undefined) => void;
  updateData: (data: any) => void;
}

const AdvancedTab: React.FC<AdvancedTabProps> = ({
  publicationDate,
  expirationDate,
  handlePublicationDateChange,
  handleExpirationDateChange,
  updateData,
}) => {
  const handleSharedProductChange = (checked: boolean) => {
    updateData({ isSharedProduct: checked });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Periodo di disponibilità</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePicker
            label="Data di pubblicazione"
            date={publicationDate}
            onSelect={handlePublicationDateChange}
            description="Quando il prodotto diventerà visibile"
          />
          
          <DatePicker
            label="Data di scadenza"
            date={expirationDate}
            onSelect={handleExpirationDateChange}
            description="Quando il prodotto non sarà più visibile"
          />
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="shared-product">Prodotto condiviso</Label>
            <p className="text-sm text-muted-foreground">
              Condividi questo prodotto con altri negozi nel catalogo
            </p>
          </div>
          <FormField
            name="isSharedProduct"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={handleSharedProductChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedTab;
