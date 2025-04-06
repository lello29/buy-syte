
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUser, Palette, Building, Share2, Database } from "lucide-react";
import GeneralTab from "./components/GeneralTab";
import AppearanceTab from "./components/AppearanceTab";
import AboutTab from "./components/AboutTab";
import SocialTab from "./components/SocialTab";
import { DatabaseMigrationCard } from "@/components/admin/settings/DatabaseMigrationCard";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";

const ShopSettingsContainer: React.FC = () => {
  // General tab state
  const [generalFormData, setGeneralFormData] = useState({
    name: "Il Mio Negozio",
    description: "Descrizione del negozio",
    address: "Via Roma 123, Milano",
    phone: "+39 123 456 7890",
    email: "info@mionegozio.it",
    websiteUrl: "https://www.mionegozio.it",
    openingHours: "Lun-Ven: 9:00-18:00\nSab: 9:00-13:00",
    categories: "Abbigliamento, Accessori, Scarpe"
  });

  // About tab state
  const [aboutFormData, setAboutFormData] = useState({
    aboutUs: "Il nostro negozio è stato fondato nel 2010 con l'obiettivo di offrire prodotti di alta qualità a prezzi accessibili."
  });

  // Social tab state
  const [socialFormData, setSocialFormData] = useState({
    socialLinks: {
      facebook: "https://facebook.com/mionegozio",
      instagram: "https://instagram.com/mionegozio",
      twitter: "https://twitter.com/mionegozio"
    }
  });

  // Appearance tab state
  const [shopAppearance, setShopAppearance] = useState({
    logoImage: "",
    bannerImage: ""
  });

  // General tab handlers
  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informazioni generali salvate con successo");
    // Qui inseriresti la logica per salvare i dati su Supabase
    console.log("Dati generali da salvare:", generalFormData);
  };

  // About tab handlers
  const handleAboutInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Informazioni sul negozio salvate con successo");
    // Qui inseriresti la logica per salvare i dati su Supabase
    console.log("Dati about da salvare:", aboutFormData);
  };

  // Social tab handlers
  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialFormData(prev => ({
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Link social media salvati con successo");
    // Qui inseriresti la logica per salvare i dati su Supabase
    console.log("Dati social da salvare:", socialFormData);
  };

  // Appearance tab handlers
  const handleImageUpload = (type: 'logo' | 'banner') => {
    // In un'implementazione reale, qui apriremmo un file picker
    // Per semplicità, simuliamo l'upload con URLs di esempio
    const mockImages = {
      logo: "https://via.placeholder.com/150",
      banner: "https://via.placeholder.com/1200x400"
    };
    
    setShopAppearance(prev => ({
      ...prev,
      [type === 'logo' ? 'logoImage' : 'bannerImage']: mockImages[type]
    }));
    
    toast.success(`Immagine ${type === 'logo' ? 'logo' : 'banner'} caricata`);
  };

  const handleAppearanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Aspetto del negozio aggiornato con successo");
    // Qui inseriresti la logica per salvare i dati su Supabase
    console.log("Dati appearance da salvare:", shopAppearance);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Impostazioni Negozio</h1>
      
      {!isSupabaseConfigured && (
        <div className="bg-yellow-50 p-4 rounded-md mb-6 text-yellow-800 border border-yellow-200">
          <p className="font-medium">Configurazione Supabase mancante</p>
          <p className="text-sm mt-1">
            Per utilizzare tutte le funzionalità di impostazione del negozio, aggiungi le variabili d'ambiente 
            VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY al tuo progetto.
          </p>
        </div>
      )}
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <CircleUser className="h-4 w-4" />
            <span className="hidden md:inline">Generali</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden md:inline">Aspetto</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Informazioni</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className="hidden md:inline">Social</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">Database</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralTab 
            formData={generalFormData}
            handleInputChange={handleGeneralInputChange}
            handleSubmit={handleGeneralSubmit}
          />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceTab 
            shop={shopAppearance}
            handleImageUpload={handleImageUpload}
            handleSubmit={handleAppearanceSubmit}
          />
        </TabsContent>
        
        <TabsContent value="about">
          <AboutTab 
            formData={aboutFormData}
            handleInputChange={handleAboutInputChange}
            handleSubmit={handleAboutSubmit}
          />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialTab 
            formData={socialFormData}
            handleSocialInputChange={handleSocialInputChange}
            handleSubmit={handleSocialSubmit}
          />
        </TabsContent>
        
        <TabsContent value="database">
          <div className="grid gap-6">
            <DatabaseMigrationCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopSettingsContainer;
