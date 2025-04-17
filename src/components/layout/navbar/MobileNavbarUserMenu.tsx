
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getMenuItems } from "./menuItems";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface MobileNavbarUserMenuProps {
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNavbarUserMenu = ({ setMobileMenuOpen }: MobileNavbarUserMenuProps) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) return null;

  const menuItems = getMenuItems(currentUser);

  const handleDisabledClick = (label: string) => {
    toast.error(`La funzionalità "${label}" non è ancora disponibile`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="font-medium text-sm text-gray-500 py-1">Mio Profilo</div>
      {menuItems.map((item, index) => (
        item.disabled ? (
          <Button 
            key={index}
            variant="ghost" 
            size="sm"
            className="w-full justify-between opacity-50"
            onClick={() => handleDisabledClick(item.label)}
          >
            <span className="flex items-center">
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Link 
            key={index} 
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-between"
            >
              <span className="flex items-center">
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )
      ))}
    </div>
  );
};

export default MobileNavbarUserMenu;
