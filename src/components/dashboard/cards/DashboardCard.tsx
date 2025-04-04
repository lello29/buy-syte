
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
  variant?: "default" | "primary";
  iconPosition?: "left" | "right";
  valueSize?: "default" | "large";
  footerVariant?: "default" | "primary" | "full";
  className?: string;
  rightIcon?: React.ReactNode;
  showFooter?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  description, 
  value, 
  icon, 
  linkTo,
  buttonText,
  variant = "default",
  iconPosition = "right",
  valueSize = "default",
  footerVariant = "default",
  className = "",
  rightIcon,
  showFooter = true
}) => {
  // If it's a primary variant, we don't need the Card wrapper
  if (variant === "primary") {
    return (
      <div className={className}>
        <CardContent
          title={title}
          value={value}
          description={description}
          icon={icon}
          variant={variant}
          iconPosition={iconPosition}
          valueSize={valueSize}
        />
        {showFooter && (
          <CardFooter 
            linkTo={linkTo} 
            buttonText={buttonText} 
            variant={footerVariant} 
            rightIcon={rightIcon}
          />
        )}
      </div>
    );
  }

  // Default card with white background
  return (
    <Card className={`border-0 shadow-sm ${className}`}>
      <UICardContent className="p-0">
        <CardContent
          title={title}
          value={value}
          description={description}
          icon={icon}
          variant={variant}
          iconPosition={iconPosition}
          valueSize={valueSize}
        />
        {showFooter && (
          <CardFooter 
            linkTo={linkTo} 
            buttonText={buttonText} 
            variant={footerVariant}
            rightIcon={rightIcon}
          />
        )}
      </UICardContent>
    </Card>
  );
};

export default DashboardCard;
