
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
    vatNumber: "",
    latitude: undefined,
    longitude: undefined,
    category: undefined
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ShopFormErrors>({});

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  const handleInputChange = (field: keyof ShopFormData, value: string | number) => {
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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast.info("Rilevamento posizione in corso...");
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            latitude,
            longitude
          }));
          toast.success("Posizione rilevata con successo!");
        },
        (error) => {
          console.error("Errore di geolocalizzazione:", error);
          toast.error("Impossibile rilevare la posizione. Verifica le autorizzazioni del browser.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("La geolocalizzazione non è supportata da questo browser.");
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
    
    if (!formData.category) {
      setErrors(prev => ({ ...prev, category: "Seleziona una categoria" }));
      toast.error("Seleziona una categoria per il tuo negozio");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update user role with fiscal code and VAT number
    updateUserRole("shop", {
      fiscalCode: formData.fiscalCode,
      vatNumber: formData.vatNumber,
      shopData: {
        name: formData.shopName,
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        category: formData.category,
        location: formData.latitude && formData.longitude 
          ? { latitude: formData.latitude, longitude: formData.longitude }
          : undefined
      }
    });
    
    setLoading(false);
    
    // Clear form after successful submission
    setFormData({
      shopName: "",
      description: "",
      address: "",
      phone: "",
      fiscalCode: "",
      vatNumber: "",
      latitude: undefined,
      longitude: undefined,
      category: undefined
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
            onGetLocation={handleGetLocation}
          />
          
          <ShopBenefitsCard />
        </CardContent>
      </Card>
    </div>
  );
};

export default ConvertToShopPage;
