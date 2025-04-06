
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface ShopStatusFieldsProps {
  aiCredits: number;
  isApproved?: boolean;
  onShopChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange?: (field: string, checked: boolean) => void;
}

const ShopStatusFields: React.FC<ShopStatusFieldsProps> = ({
  aiCredits,
  isApproved,
  onShopChange,
  onCheckboxChange
}) => {
  const handleCheckboxChange = (checked: boolean) => {
    if (onCheckboxChange) {
      onCheckboxChange("isApproved", checked);
    } else {
      // Fallback to the old method if onCheckboxChange is not provided
      const syntheticEvent = {
        target: {
          name: "isApproved",
          value: checked
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      
      onShopChange(syntheticEvent);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-1">
        <Label htmlFor="aiCredits">Crediti AI <span className="text-red-500">*</span></Label>
        <Input 
          id="aiCredits"
          name="aiCredits"
          type="number" 
          value={aiCredits}
          onChange={onShopChange}
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isApproved"
          checked={isApproved !== false}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor="isApproved" className="cursor-pointer">Approvato</Label>
      </div>
    </>
  );
};

export default ShopStatusFields;
