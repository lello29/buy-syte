
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { shops } from "@/data/mockData";
import { toast } from "sonner";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Store, 
  Upload, 
  Clock, 
  Globe, 
  UploadCloud,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";

const ShopSettingsPage = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div>Accesso non autorizzato</div>;
  }
  
  const shop = shops.find(shop => shop.userId === currentUser.id);
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }

  // State to hold form data
  const [formData, setFormData] = useState({
    name: shop.name || "",
    description: shop.description || "",
    address: shop.address || "",
    phone: shop.phone || "",
    email: shop.email || "",
    websiteUrl: shop.websiteUrl || "",
    openingHours: shop.openingHours || "",
    aboutUs: shop.aboutUs || "",
    categories: shop.categories?.join(", ") || "",
    socialLinks: {
      facebook: shop.socialLinks?.facebook || "",
      instagram: shop.socialLinks?.instagram || "",
      twitter: shop.socialLinks?.twitter || "",
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value
      }
    });
  };

  const handleImageUpload = (type: 'logo' | 'banner') => {
    // In a real app, this would open a file picker and upload the image
    toast.info(`Funzionalità di caricamento ${type === 'logo' ? 'logo' : 'banner'} in fase di sviluppo`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    toast.success("Impostazioni negozio salvate con successo");
  };

  const handlePreview = () => {
    // In a real app, this would navigate to the public shop page
    toast.info(`Anteprima pagina pubblica per ${shop.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Impostazioni Negozio</h1>
          <p className="text-muted-foreground">
            Gestisci i dettagli del tuo negozio e personalizza la tua pagina pubblica.
          </p>
        </div>
        <Button onClick={handlePreview}>
          <Globe className="mr-2 h-4 w-4" />
          Anteprima Pagina
        </Button>
      </div>
      
      <Separator />
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="appearance">Aspetto</TabsTrigger>
          <TabsTrigger value="about">Chi Siamo</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Generali</CardTitle>
              <CardDescription>
                Queste informazioni verranno mostrate pubblicamente nella tua pagina negozio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Negozio</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Sito Web</Label>
                    <Input 
                      id="websiteUrl" 
                      name="websiteUrl" 
                      placeholder="https://..." 
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Indirizzo</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione Breve</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Breve descrizione del tuo negozio" 
                    rows={2}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categories">Categorie</Label>
                  <Input 
                    id="categories" 
                    name="categories" 
                    placeholder="Separa le categorie con una virgola" 
                    value={formData.categories}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Esempio: Abbigliamento, Scarpe, Accessori
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="openingHours">Orari di Apertura</Label>
                  <Textarea 
                    id="openingHours" 
                    name="openingHours" 
                    placeholder="Lun-Ven: 9:00-18:00&#10;Sab: 9:00-13:00"
                    rows={3}
                    value={formData.openingHours}
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Inserisci ogni fascia oraria su una nuova riga
                  </p>
                </div>
                
                <Button type="submit">Salva Informazioni</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aspetto e Branding</CardTitle>
              <CardDescription>
                Personalizza l'aspetto della tua pagina pubblica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden">
                      {shop.logoImage ? (
                        <img 
                          src={shop.logoImage} 
                          alt="Logo" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <Store className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <Button variant="outline" onClick={() => handleImageUpload('logo')}>
                      <Upload className="mr-2 h-4 w-4" />
                      Carica Logo
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dimensione consigliata: 500x500 pixel. Formato: JPG, PNG.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Immagine Banner</Label>
                  <div className="space-y-4">
                    <div className="aspect-[3/1] rounded-lg bg-gray-100 border flex items-center justify-center overflow-hidden">
                      {shop.bannerImage ? (
                        <img 
                          src={shop.bannerImage} 
                          alt="Banner" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <UploadCloud className="w-12 h-12 mb-2" />
                          <span>Immagine Banner</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" onClick={() => handleImageUpload('banner')}>
                      <Upload className="mr-2 h-4 w-4" />
                      Carica Banner
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dimensione consigliata: 1200x400 pixel. Formato: JPG, PNG.
                  </p>
                </div>
                
                <Button onClick={handleSubmit}>Salva Modifiche</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Chi Siamo</CardTitle>
              <CardDescription>
                Racconta ai tuoi clienti la storia del tuo negozio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutUs">Il Nostro Negozio</Label>
                  <Textarea 
                    id="aboutUs" 
                    name="aboutUs" 
                    placeholder="Racconta la storia, la filosofia e i valori del tuo negozio..."
                    rows={8}
                    value={formData.aboutUs}
                    onChange={handleInputChange}
                  />
                </div>
                
                <Button type="submit">Salva Contenuto</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>
                Collega i tuoi account social alla pagina del negozio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Facebook className="w-6 h-6 text-blue-600" />
                    <div className="flex-1">
                      <Input 
                        placeholder="URL Facebook" 
                        name="facebook"
                        value={formData.socialLinks.facebook}
                        onChange={handleSocialInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Instagram className="w-6 h-6 text-pink-600" />
                    <div className="flex-1">
                      <Input 
                        placeholder="URL Instagram" 
                        name="instagram"
                        value={formData.socialLinks.instagram}
                        onChange={handleSocialInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Twitter className="w-6 h-6 text-blue-400" />
                    <div className="flex-1">
                      <Input 
                        placeholder="URL Twitter/X" 
                        name="twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleSocialInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit">Salva Social Media</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopSettingsPage;
