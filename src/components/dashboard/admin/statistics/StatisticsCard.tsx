
import React from "react";
import { Button } from "@/components/ui/button";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  maxValue?: number;
  progressValue?: number;
  showProgress?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  description,
  maxValue,
  progressValue,
  showProgress = false,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">
          {value}
        </span>
        {maxValue && (
          <span className="text-sm text-gray-500">
            di {maxValue}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}
      {showProgress && typeof progressValue === 'number' && (
        <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      )}
      {buttonText && (
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default StatisticsCard;
