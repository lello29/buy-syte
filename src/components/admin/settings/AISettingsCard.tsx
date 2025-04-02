
import React, { useState } from "react";
import { Sparkles, Key, PlusCircle, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
}

export function AISettingsCard() {
  const [aiProviders, setAIProviders] = useState<AIProvider[]>([
    { id: "openai", name: "OpenAI", enabled: true, apiKey: "" },
    { id: "deepseek", name: "DeepSeek", enabled: false, apiKey: "" },
  ]);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [newProviderName, setNewProviderName] = useState("");

  const handleToggleProvider = (id: string) => {
    setAIProviders(
      aiProviders.map((provider) =>
        provider.id === id
          ? { ...provider, enabled: !provider.enabled }
          : provider
      )
    );
  };

  const handleApiKeyChange = (id: string, value: string) => {
    setAIProviders(
      aiProviders.map((provider) =>
        provider.id === id ? { ...provider, apiKey: value } : provider
      )
    );
  };

  const handleAddProvider = () => {
    if (newProviderName.trim() === "") {
      toast.error("Inserisci un nome per il provider AI");
      return;
    }

    const id = newProviderName.toLowerCase().replace(/\s+/g, "-");
    
    if (aiProviders.some(provider => provider.id === id)) {
      toast.error("Questo provider esiste già");
      return;
    }

    setAIProviders([
      ...aiProviders,
      { id, name: newProviderName, enabled: false, apiKey: "" },
    ]);
    setNewProviderName("");
    toast.success("Provider AI aggiunto");
  };

  const handleRemoveProvider = (id: string) => {
    setAIProviders(aiProviders.filter(provider => provider.id !== id));
    toast.success("Provider AI rimosso");
  };

  const handleSaveSettings = () => {
    // In a real app, this would save settings to a database
    toast.success("Impostazioni AI salvate con successo");
  };

  const handleTestApiKey = (id: string) => {
    const provider = aiProviders.find(p => p.id === id);
    if (!provider?.apiKey) {
      toast.error("Inserisci prima una chiave API");
      return;
    }
    
    // Simulate API test
    toast.info(`Test della chiave API di ${provider.name} in corso...`);
    setTimeout(() => {
      toast.success(`Chiave API di ${provider.name} valida!`);
    }, 1500);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Configurazione AI
        </CardTitle>
        <CardDescription>
          Gestisci i provider AI e le relative API keys
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="default-model">Modello AI Predefinito</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="default-model" className="w-full">
                <SelectValue placeholder="Seleziona un modello" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">OpenAI GPT-4o</SelectItem>
                <SelectItem value="gpt-4o-mini">OpenAI GPT-4o Mini</SelectItem>
                <SelectItem value="deepseek-large">DeepSeek Large</SelectItem>
                <SelectItem value="deepseek-coder">DeepSeek Coder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h3 className="text-sm font-medium mb-3">Provider AI Disponibili</h3>
            <div className="space-y-4">
              {aiProviders.map((provider) => (
                <div key={provider.id} className="space-y-2 p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${provider.id}-toggle`} className="font-medium">
                      {provider.name}
                    </Label>
                    <Switch
                      id={`${provider.id}-toggle`}
                      checked={provider.enabled}
                      onCheckedChange={() => handleToggleProvider(provider.id)}
                    />
                  </div>
                  
                  {provider.enabled && (
                    <div className="space-y-2 pt-2">
                      <Label htmlFor={`${provider.id}-key`}>API Key</Label>
                      <div className="flex space-x-2">
                        <Input
                          id={`${provider.id}-key`}
                          type="password"
                          value={provider.apiKey}
                          onChange={(e) =>
                            handleApiKeyChange(provider.id, e.target.value)
                          }
                          className="flex-grow"
                          placeholder={`Inserisci API Key ${provider.name}`}
                        />
                        <Button
                          variant="outline"
                          onClick={() => handleTestApiKey(provider.id)}
                          className="whitespace-nowrap"
                        >
                          Test API
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {!["openai", "deepseek"].includes(provider.id) && (
                    <div className="flex justify-end pt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => handleRemoveProvider(provider.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Rimuovi
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Label>Aggiungi Nuovo Provider</Label>
            <div className="flex space-x-2">
              <Input
                value={newProviderName}
                onChange={(e) => setNewProviderName(e.target.value)}
                placeholder="Nome del provider"
                className="flex-grow"
              />
              <Button onClick={handleAddProvider}>
                <PlusCircle className="h-4 w-4 mr-1" /> Aggiungi
              </Button>
            </div>
          </div>
          
          <Button
            className="w-full mt-4"
            onClick={handleSaveSettings}
          >
            Salva Configurazione AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
