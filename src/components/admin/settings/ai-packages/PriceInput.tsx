
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PriceInput = ({ id, label, value, onChange }: PriceInputProps) => {
  return (
    <div className="space-y-2 mt-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
          €
        </span>
        <Input
          id={id}
          type="number"
          className="rounded-l-none focus:border-primary"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
