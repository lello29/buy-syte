
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
    <Card className="shadow-sm border-0 bg-background">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
