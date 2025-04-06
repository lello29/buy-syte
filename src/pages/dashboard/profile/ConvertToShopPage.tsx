
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ConvertToShopPage = () => {
  const { currentUser, updateUserRole } = useAuth();
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fiscalCode, setFiscalCode] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!shopName.trim()) newErrors.shopName = "Nome negozio obbligatorio";
    if (!description.trim()) newErrors.description = "Descrizione obbligatoria";
    if (!address.trim()) newErrors.address = "Indirizzo obbligatorio";
    if (!phone.trim()) newErrors.phone = "Telefono obbligatorio";
    if (!fiscalCode.trim()) newErrors.fiscalCode = "Codice Fiscale obbligatorio";
    if (!vatNumber.trim()) newErrors.vatNumber = "Partita IVA obbligatoria";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Compila tutti i campi obbligatori");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would create a shop profile in the database
    // with fiscalCode and vatNumber
    updateUserRole("shop", {
      fiscalCode,
      vatNumber
    });
    setLoading(false);
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
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">Nome Negozio <span className="text-red-500">*</span></Label>
              <Input
                id="shopName"
                placeholder="Es. Elettronica Store"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                className={errors.shopName ? "border-red-500" : ""}
              />
              {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                placeholder="Descrivi brevemente la tua attività e i prodotti/servizi offerti"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Indirizzo <span className="text-red-500">*</span></Label>
                <Input
                  id="address"
                  placeholder="Es. Via Roma 123, Milano"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono <span className="text-red-500">*</span></Label>
                <Input
                  id="phone"
                  placeholder="Es. +39 02 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiscalCode">Codice Fiscale <span className="text-red-500">*</span></Label>
                <Input
                  id="fiscalCode"
                  placeholder="Es. RSSMRA80A01H501U"
                  value={fiscalCode}
                  onChange={(e) => setFiscalCode(e.target.value)}
                  required
                  className={errors.fiscalCode ? "border-red-500" : ""}
                />
                {errors.fiscalCode && <p className="text-red-500 text-sm">{errors.fiscalCode}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vatNumber">Partita IVA <span className="text-red-500">*</span></Label>
                <Input
                  id="vatNumber"
                  placeholder="Es. 12345678901"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  required
                  className={errors.vatNumber ? "border-red-500" : ""}
                />
                {errors.vatNumber && <p className="text-red-500 text-sm">{errors.vatNumber}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={currentUser.email}
                disabled
                className="bg-gray-100"
              />
              <p className="text-sm text-gray-500">
                Utilizzeremo questa email per le comunicazioni ufficiali.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-200">
              <p className="font-medium mb-2">Vantaggi dell'account negozio:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Crea il tuo catalogo prodotti</li>
                <li>Gestisci ordini e clienti</li>
                <li>Crea offerte personalizzate</li>
                <li>Accesso a strumenti di analisi</li>
                <li>Assistenza AI per il tuo business</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Converti in Account Negozio
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ConvertToShopPage;
