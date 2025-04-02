
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Loader2 } from "lucide-react";

const ConvertToShopPage = () => {
  const { currentUser, updateUserRole } = useAuth();
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would create a shop profile in the database
    updateUserRole("shop");
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
              <Label htmlFor="shopName">Nome Negozio</Label>
              <Input
                id="shopName"
                placeholder="Es. Elettronica Store"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea
                id="description"
                placeholder="Descrivi brevemente la tua attività e i prodotti/servizi offerti"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Indirizzo</Label>
                <Input
                  id="address"
                  placeholder="Es. Via Roma 123, Milano"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefono</Label>
                <Input
                  id="phone"
                  placeholder="Es. +39 02 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
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
