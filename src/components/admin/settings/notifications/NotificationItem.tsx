
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface NotificationItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  showSeparator?: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  label,
  checked,
  onChange,
  showSeparator = true
}) => {
  return (
    <>
      <div className="flex items-center justify-between space-x-2 py-2">
        <Label htmlFor={id} className="font-medium">{label}</Label>
        <Switch 
          id={id} 
          checked={checked}
          onCheckedChange={onChange}
        />
      </div>
      
      {showSeparator && <Separator />}
    </>
  );
};
