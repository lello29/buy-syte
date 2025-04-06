
import React from "react";
import { AIProviderItem } from "./AIProviderItem";

interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
}

interface AIProvidersListProps {
  providers: AIProvider[];
  onToggleProvider: (id: string) => void;
  onApiKeyChange: (id: string, value: string) => void;
  onRemoveProvider: (id: string) => void;
}

export const AIProvidersList = ({
  providers,
  onToggleProvider,
  onApiKeyChange,
  onRemoveProvider
}: AIProvidersListProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Provider AI Disponibili</h3>
      <div className="space-y-4">
        {providers.map((provider) => (
          <AIProviderItem
            key={provider.id}
            provider={provider}
            onToggle={onToggleProvider}
            onApiKeyChange={onApiKeyChange}
            onRemove={onRemoveProvider}
            isDeletable={!["openai", "deepseek"].includes(provider.id)}
          />
        ))}
      </div>
    </div>
  );
};
