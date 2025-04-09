
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SHOP_CATEGORIES } from '../../constants/shopCategories';

interface ShopCategoryFieldProps {
  category: string;
  handleCategoryChange: (value: string) => void;
}

const ShopCategoryField: React.FC<ShopCategoryFieldProps> = ({
  category,
  handleCategoryChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria</Label>
      <Select 
        value={category} 
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleziona categoria" />
        </SelectTrigger>
        <SelectContent>
          {SHOP_CATEGORIES.map(category => (
            <SelectItem key={category} value={category.toLowerCase()}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShopCategoryField;
