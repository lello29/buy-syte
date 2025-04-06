
import { useState } from "react";
import { toast } from "sonner";

interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
}

export const useAISettings = () => {
  const [aiProviders, setAIProviders] = useState<AIProvider[]>([
    { id: "openai", name: "OpenAI", enabled: true, apiKey: "" },
    { id: "deepseek", name: "DeepSeek", enabled: false, apiKey: "" },
  ]);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

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

  const handleAddProvider = (newProviderName: string) => {
    const id = newProviderName.toLowerCase().replace(/\s+/g, "-");
    
    if (aiProviders.some(provider => provider.id === id)) {
      toast.error("Questo provider esiste già");
      return;
    }

    setAIProviders([
      ...aiProviders,
      { id, name: newProviderName, enabled: false, apiKey: "" },
    ]);
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

  return {
    aiProviders,
    selectedModel,
    setSelectedModel,
    handleToggleProvider,
    handleApiKeyChange,
    handleAddProvider,
    handleRemoveProvider,
    handleSaveSettings
  };
};
