
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUser, Palette, Building, Share2, Database } from "lucide-react";
import GeneralTab from "./components/GeneralTab";
import AppearanceTab from "./components/AppearanceTab";
import AboutTab from "./components/AboutTab";
import SocialTab from "./components/SocialTab";
import { DatabaseMigrationCard } from "@/components/admin/settings/DatabaseMigrationCard";

const ShopSettingsContainer: React.FC = () => {
  return (
    <div className="container max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Impostazioni Negozio</h1>
      
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
          <GeneralTab />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceTab />
        </TabsContent>
        
        <TabsContent value="about">
          <AboutTab />
        </TabsContent>
        
        <TabsContent value="social">
          <SocialTab />
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
