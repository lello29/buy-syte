
import React from "react";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModelSelector } from "./ai-settings/ModelSelector";
import { AIProvidersList } from "./ai-settings/AIProvidersList";
import { AddProviderForm } from "./ai-settings/AddProviderForm";
import { useAISettings } from "./ai-settings/hooks/useAISettings";

export function AISettingsCard() {
  const {
    aiProviders,
    selectedModel,
    setSelectedModel,
    handleToggleProvider,
    handleApiKeyChange,
    handleAddProvider,
    handleRemoveProvider,
    handleSaveSettings
  } = useAISettings();

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
          <ModelSelector 
            selectedModel={selectedModel} 
            onModelChange={setSelectedModel} 
          />
          
          <Separator className="my-4" />
          
          <AIProvidersList 
            providers={aiProviders}
            onToggleProvider={handleToggleProvider}
            onApiKeyChange={handleApiKeyChange}
            onRemoveProvider={handleRemoveProvider}
          />
          
          <Separator className="my-4" />
          
          <AddProviderForm onAddProvider={handleAddProvider} />
          
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
