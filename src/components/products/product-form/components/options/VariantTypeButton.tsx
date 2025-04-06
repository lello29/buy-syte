
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface VariantTypeButtonProps {
  type: {
    id: string;
    label: string;
    icon: LucideIcon;
  };
  onClick: () => void;
  disabled: boolean;
}

const VariantTypeButton: React.FC<VariantTypeButtonProps> = ({ type, onClick, disabled }) => {
  const Icon = type.icon;
  
  return (
    <Button
      key={type.id}
      variant="outline"
      className="h-20 flex flex-col items-center justify-center"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-6 w-6 mb-1" />
      <span className="text-xs">{type.label}</span>
    </Button>
  );
};

export default VariantTypeButton;
