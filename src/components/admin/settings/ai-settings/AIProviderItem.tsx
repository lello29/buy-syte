
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface AIProvider {
  id: string;
  name: string;
  enabled: boolean;
  apiKey: string;
}

interface AIProviderItemProps {
  provider: AIProvider;
  onToggle: (id: string) => void;
  onApiKeyChange: (id: string, value: string) => void;
  onRemove?: (id: string) => void;
  isDeletable?: boolean;
}

export const AIProviderItem = ({
  provider,
  onToggle,
  onApiKeyChange,
  onRemove,
  isDeletable = false
}: AIProviderItemProps) => {
  const handleTestApiKey = (id: string) => {
    if (!provider.apiKey) {
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
    <div className="space-y-2 p-3 bg-slate-50 rounded-md">
      <div className="flex items-center justify-between">
        <Label htmlFor={`${provider.id}-toggle`} className="font-medium">
          {provider.name}
        </Label>
        <Switch
          id={`${provider.id}-toggle`}
          checked={provider.enabled}
          onCheckedChange={() => onToggle(provider.id)}
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
              onChange={(e) => onApiKeyChange(provider.id, e.target.value)}
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
      
      {isDeletable && onRemove && (
        <div className="flex justify-end pt-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive/90"
            onClick={() => onRemove(provider.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Rimuovi
          </Button>
        </div>
      )}
    </div>
  );
};
