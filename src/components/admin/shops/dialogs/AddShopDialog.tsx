
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shop } from '@/types';

// Import the smaller components
import ShopBasicInfoFields from './shop-form/ShopBasicInfoFields';
import ShopCategoryField from './shop-form/ShopCategoryField';
import ShopContactFields from './shop-form/ShopContactFields';
import ShopTaxFields from './shop-form/ShopTaxFields';
import ShopFormActions from './shop-form/ShopFormActions';

interface AddShopDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateShop: (shop: Partial<Shop>) => Promise<Shop | null>;
  onSelectChange: (value: string, name: string) => void;
}

const AddShopDialog: React.FC<AddShopDialogProps> = ({ 
  open, 
  onOpenChange, 
  onCreateShop, 
  onSelectChange 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    category: 'general',
    fiscalCode: '',
    vatNumber: ''
  });

  useEffect(() => {
    console.log("AddShopDialog - open stato:", open);
    
    if (!open) {
      // Reset form when dialog closes
      setFormData({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        category: 'general',
        fiscalCode: '',
        vatNumber: ''
      });
      setIsSubmitting(false);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
    if (onSelectChange) {
      onSelectChange(value, 'category');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("AddShopDialog form submitted with data:", formData);
    setIsSubmitting(true);
    
    try {
      const result = await onCreateShop(formData);
      console.log("AddShopDialog onCreateShop result:", result);
      if (result) {
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error submitting shop:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Negozio</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli per creare un nuovo negozio nel marketplace
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Basic Info Fields */}
            <ShopBasicInfoFields 
              name={formData.name}
              description={formData.description}
              address={formData.address}
              handleChange={handleChange}
            />
            
            {/* Category Field */}
            <ShopCategoryField 
              category={formData.category}
              handleCategoryChange={handleCategoryChange}
            />
            
            {/* Contact Fields */}
            <ShopContactFields 
              phone={formData.phone}
              email={formData.email}
              handleChange={handleChange}
            />
            
            {/* Tax Fields */}
            <ShopTaxFields 
              fiscalCode={formData.fiscalCode}
              vatNumber={formData.vatNumber}
              handleChange={handleChange}
            />
          </div>
          
          <DialogFooter>
            <ShopFormActions 
              isSubmitting={isSubmitting} 
              onCancel={() => onOpenChange(false)}
              isCreating={true}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShopDialog;
