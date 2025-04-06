
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { shops } from "@/data/shops";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Globe, Settings } from "lucide-react";
import GeneralTab from "./components/GeneralTab";
import AppearanceTab from "./components/AppearanceTab";
import AboutTab from "./components/AboutTab";
import SocialTab from "./components/SocialTab";

const ShopSettingsContainer: React.FC = () => {
  const { currentUser, getUserShop } = useAuth();
  
  // Questa verifica dovrebbe essere già gestita dal componente ShopAuthCheck
  // ma la manteniamo per sicurezza
  if (!currentUser || currentUser.role !== "shop") {
    return <div>Accesso non autorizzato</div>;
  }
  
  const shop = getUserShop();
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }

  // State to hold form data
  const [formData, setFormData] = React.useState({
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
        <div className="flex gap-2">
          <Button onClick={handlePreview} variant="outline">
            <Globe className="mr-2 h-4 w-4" />
            Anteprima Pagina
          </Button>
        </div>
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
              <GeneralTab 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
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
              <AppearanceTab 
                shop={shop} 
                handleImageUpload={handleImageUpload} 
                handleSubmit={handleSubmit} 
              />
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
              <AboutTab 
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
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
              <SocialTab 
                formData={formData}
                handleSocialInputChange={handleSocialInputChange}
                handleSubmit={handleSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopSettingsContainer;
