
import React, { ReactNode } from "react";

interface CardContentProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  variant?: "default" | "primary";
  iconPosition?: "left" | "right";
  valueSize?: "default" | "large";
}

const CardContent: React.FC<CardContentProps> = ({
  title,
  value,
  description,
  icon,
  variant = "default",
  iconPosition = "right",
  valueSize = "default",
}) => {
  const bgColor = variant === "primary" ? "bg-primary text-white" : "bg-white";
  const textColor = variant === "primary" ? "text-white" : "text-gray-500";
  const iconBg = variant === "primary" ? "bg-white/20" : "bg-primary/10";
  const iconTextColor = variant === "primary" ? "text-white" : "text-primary";
  const valueSizeClass = valueSize === "large" ? "text-4xl" : "text-2xl";

  return (
    <div className={`flex items-center justify-between ${bgColor} rounded-lg p-4`}>
      {iconPosition === "left" && (
        <div className={`${iconBg} p-3 rounded-full mr-4`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `h-6 w-6 ${iconTextColor}` 
          })}
        </div>
      )}
      <div className={iconPosition === "left" ? "" : "mr-auto"}>
        <p className={`text-sm font-medium ${textColor}`}>{title}</p>
        <p className={`${valueSizeClass} font-bold ${variant === "primary" ? "text-white" : ""}`}>{value}</p>
        {description && <p className={`text-sm ${textColor} mt-1`}>{description}</p>}
      </div>
      {iconPosition === "right" && (
        <div className={`${iconBg} p-3 rounded-full`}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: `h-6 w-6 ${iconTextColor}` 
          })}
        </div>
      )}
    </div>
  );
};

export default CardContent;
