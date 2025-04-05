
import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

interface MobileDashboardItemProps {
  label: string;
  icon: React.ReactNode;
  path: string;
  available: boolean;
  onUnavailable: (label: string) => void;
}

const MobileDashboardItem: React.FC<MobileDashboardItemProps> = ({
  label,
  icon,
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
      className={`bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center text-center transition-transform ${available ? 'hover:shadow-md hover:-translate-y-1' : 'opacity-80'}`}
    >
      {icon}
      <span className="text-lg font-bold text-[#0a3276] mt-2">{label}</span>
      {!available && (
        <div className="flex items-center mt-1 text-amber-600 text-xs">
          <AlertTriangle className="h-3 w-3 mr-1" />
          <span>Non disponibile</span>
        </div>
      )}
    </Link>
  );
};

export default MobileDashboardItem;
