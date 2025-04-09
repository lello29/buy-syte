
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SHOP_CATEGORIES } from '../constants/shopCategories';
import { Shop } from '@/types';
import { Loader2 } from 'lucide-react';

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
    console.log("AddShopDialog useEffect - open state changed to:", open);
    
    // Migliorato il debug con timing
    if (open) {
      console.log("AddShopDialog è APERTO - timestamp:", new Date().toISOString());
      document.body.classList.add('dialog-open');
      
      // Verifica se il dialogo è realmente visibile nel DOM
      setTimeout(() => {
        const dialogElement = document.querySelector('[role="dialog"]');
        console.log("AddShopDialog - DOM element presente:", !!dialogElement);
        if (!dialogElement) {
          console.warn("ERRORE: Dialogo non trovato nel DOM anche se 'open' è true!");
        }
      }, 100);
    } else {
      console.log("AddShopDialog è CHIUSO - timestamp:", new Date().toISOString());
      document.body.classList.remove('dialog-open');
      
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
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Error submitting shop:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  console.log("AddShopDialog rendered, open:", open);

  return (
    <Dialog open={open} onOpenChange={(newValue) => {
      console.log("Dialog onOpenChange triggered with value:", newValue);
      onOpenChange(newValue);
    }}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Negozio</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli per creare un nuovo negozio nel marketplace
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Negozio *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome del negozio"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Breve descrizione del negozio"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={formData.category} 
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
            
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Indirizzo completo"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Numero di telefono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email di contatto"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiscalCode">Codice Fiscale</Label>
                <Input
                  id="fiscalCode"
                  name="fiscalCode"
                  value={formData.fiscalCode}
                  onChange={handleChange}
                  placeholder="Codice fiscale"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vatNumber">Partita IVA</Label>
                <Input
                  id="vatNumber"
                  name="vatNumber"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  placeholder="Partita IVA"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                'Crea Negozio'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShopDialog;
