
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BaseCreditsInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BaseCreditsInput = ({ value, onChange }: BaseCreditsInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="base-credits">Crediti Base (Nuovi Negozi)</Label>
      <Input
        id="base-credits"
        type="number"
        value={value}
        onChange={onChange}
        className="focus:border-primary"
      />
    </div>
  );
};
