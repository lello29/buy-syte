
import React, { useState } from "react";
import { ExternalLink, Server, Copy, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDeploymentInstructions, generateDockerConfig } from "@/utils/deploymentUtils";
import { supabaseConfig } from "@/config/databaseConfig";
import { toast } from "sonner";

export function DeploymentInfoCard() {
  const [activeTab, setActiveTab] = useState("instructions");
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };
  
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    toast.success(`File ${filename} scaricato con successo!`);
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Server className="h-5 w-5 text-primary" />
          Informazioni per il Deployment
        </CardTitle>
        <CardDescription>
          Istruzioni e configurazioni per l'export dell'applicazione su VPS o hosting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert className={`${supabaseConfig.isConfigured ? 'bg-green-50 text-green-800 border-green-200' : 'bg-yellow-50 text-yellow-800 border-yellow-200'}`}>
            <AlertDescription>
              {supabaseConfig.isConfigured 
                ? "Supabase è configurato correttamente per questo ambiente."
                : "Supabase non è configurato. Aggiungi le variabili d'ambiente per il deployment."}
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="instructions" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="instructions">Istruzioni</TabsTrigger>
              <TabsTrigger value="docker">Docker</TabsTrigger>
              <TabsTrigger value="environment">Variabili</TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md text-sm font-mono h-[250px] overflow-y-auto">
                <pre>{getDeploymentInstructions()}</pre>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => copyToClipboard(getDeploymentInstructions(), "Istruzioni copiate negli appunti!")}
                >
                  <Copy className="h-4 w-4" />
                  Copia
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => downloadFile(getDeploymentInstructions(), "deployment-instructions.md", "text/markdown")}
                >
                  <Download className="h-4 w-4" />
                  Scarica MD
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="docker" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md text-sm font-mono h-[250px] overflow-y-auto">
                <pre>{generateDockerConfig()}</pre>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => copyToClipboard(generateDockerConfig(), "Dockerfile copiato negli appunti!")}
                >
                  <Copy className="h-4 w-4" />
                  Copia
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => downloadFile(generateDockerConfig(), "Dockerfile", "text/plain")}
                >
                  <Download className="h-4 w-4" />
                  Scarica Dockerfile
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="environment" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md text-sm font-mono">
                <p># Crea un file .env con queste variabili:</p>
                <p className="mt-2">VITE_SUPABASE_URL=https://tuo-progetto.supabase.co</p>
                <p>VITE_SUPABASE_ANON_KEY=chiave-anonima-supabase</p>
                
                <p className="mt-4"># Oppure impostale nel tuo provider di hosting</p>
              </div>
              
              <p className="text-sm text-gray-600">
                Queste variabili sono necessarie per il corretto funzionamento dell'applicazione.
                Non condividere mai la chiave segreta di Supabase, usa solo la chiave anonima pubblica.
              </p>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => copyToClipboard("VITE_SUPABASE_URL=https://tuo-progetto.supabase.co\nVITE_SUPABASE_ANON_KEY=chiave-anonima-supabase", "Template .env copiato negli appunti!")}
              >
                <Copy className="h-4 w-4" />
                Copia Template .env
              </Button>
            </TabsContent>
          </Tabs>
          
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => window.open("https://supabase.com/docs/guides/hosting/hosting-with-supabase", "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            Documentazione Supabase per Hosting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
