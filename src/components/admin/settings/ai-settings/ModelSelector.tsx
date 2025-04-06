
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (value: string) => void;
}

export const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="default-model">Modello AI Predefinito</Label>
      <Select value={selectedModel} onValueChange={onModelChange}>
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
  );
};
