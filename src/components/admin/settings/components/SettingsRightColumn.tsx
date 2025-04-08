
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SettingsRightColumnProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const SettingsRightColumn: React.FC<SettingsRightColumnProps> = ({
  title,
  description,
  children
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
