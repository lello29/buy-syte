
import React from "react";
import { Link } from "react-router-dom";
import { Plus, AlertTriangle } from "lucide-react";

interface ActionButtonProps {
  label: string;
  path: string;
  available: boolean;
  onUnavailable: (label: string) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  path,
  available,
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
      className={`bg-[#3b7afc] text-white rounded-lg py-4 flex items-center justify-center my-6 shadow-sm transition-all ${available ? 'hover:bg-[#2c5fc9] hover:shadow-md' : 'opacity-80'}`}
    >
      <Plus className="h-6 w-6 mr-2" />
      <span className="text-xl font-semibold">{label}</span>
      {!available && (
        <div className="flex items-center ml-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
          <AlertTriangle className="h-3 w-3 mr-1" />
          <span>Non disponibile</span>
        </div>
      )}
    </Link>
  );
};

export default ActionButton;
