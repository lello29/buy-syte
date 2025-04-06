
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { toast } from "sonner";
import { 
  ShopInformationForm, 
  ShopBenefitsCard,
  ShopFormData,
  ShopFormErrors,
  validateShopForm
} from "@/components/profile/shop-conversion";

const ConvertToShopPage = () => {
  const { currentUser, updateUserRole } = useAuth();
  const [formData, setFormData] = useState<ShopFormData>({
    shopName: "",
    description: "",
    address: "",
    phone: "",
    fiscalCode: "",
    vatNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ShopFormErrors>({});

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  const handleInputChange = (field: keyof ShopFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear the error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateShopForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Compila tutti i campi obbligatori");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update user role with fiscal code and VAT number
    updateUserRole("shop", {
      fiscalCode: formData.fiscalCode,
      vatNumber: formData.vatNumber
    });
    
    setLoading(false);
    
    // Clear form after successful submission
    setFormData({
      shopName: "",
      description: "",
      address: "",
      phone: "",
      fiscalCode: "",
      vatNumber: ""
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Diventa un Negozio</h1>
      <p className="text-gray-600 mb-8">
        Compila il form sottostante per convertire il tuo profilo in un account negozio e
        iniziare a vendere i tuoi prodotti sulla piattaforma.
      </p>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Store className="h-5 w-5 text-primary" />
            <CardTitle>Informazioni Negozio</CardTitle>
          </div>
          <CardDescription>
            Inserisci i dettagli del tuo negozio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ShopInformationForm 
            formData={formData}
            errors={errors}
            loading={loading}
            currentUserEmail={currentUser.email}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
          
          <ShopBenefitsCard />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConvertToShopPage;
