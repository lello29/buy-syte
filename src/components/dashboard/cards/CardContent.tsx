
import React, { ReactNode } from "react";

interface CardContentProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="bg-primary/10 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default CardContent;
