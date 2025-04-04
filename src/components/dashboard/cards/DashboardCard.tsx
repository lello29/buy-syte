
import React from "react";
import { Card, CardContent as UICardContent } from "@/components/ui/card";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";

interface DashboardCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
  linkTo: string;
  buttonText?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  value, 
  icon, 
  linkTo,
  buttonText
}) => {
  return (
    <Card>
      <UICardContent className="p-6">
        <CardContent
          title={title}
          value={value}
          description={description}
          icon={icon}
        />
        <CardFooter linkTo={linkTo} buttonText={buttonText} />
      </UICardContent>
    </Card>
  );
};

export default DashboardCard;
