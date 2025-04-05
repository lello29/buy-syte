
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface AdditionalOptionProps {
  label: string;
  path: string;
  available: boolean;
  isLast: boolean;
  onUnavailable: (label: string) => void;
}

const AdditionalOption: React.FC<AdditionalOptionProps> = ({
  label,
  path,
  available,
  isLast,
  onUnavailable,
}) => {
  // Handle click with availability check
  const handleClick = (e: React.MouseEvent) => {
    if (!available) {
      e.preventDefault();
      onUnavailable(label);
    }
  };

  return (
    <Link 
      to={path}
      onClick={handleClick}
      className={`p-4 flex items-center justify-between ${!isLast ? 'border-b border-gray-100' : 'last:border-0'} ${available ? 'hover:bg-gray-50' : 'opacity-80'}`}
    >
      <span className="text-xl font-semibold">{label}</span>
      <div className="flex items-center">
        {!available && (
          <span className="text-xs text-amber-600 mr-2">Non disponibile</span>
        )}
        <ChevronRight className="h-6 w-6 text-gray-400" />
      </div>
    </Link>
  );
};

export default AdditionalOption;
