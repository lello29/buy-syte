
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { getMenuItems } from "./menuItems";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User } from "lucide-react";
import { toast } from "sonner";

const NavbarUserMenu = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;

  const menuItems = getMenuItems(currentUser);

  const handleDisabledClick = (label: string) => {
    toast.error(`La funzionalità "${label}" non è ancora disponibile`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <User className="h-4 w-4" />
          Mio Profilo
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Il mio account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item, index) => (
          <DropdownMenuItem 
            key={index} 
            asChild={!item.disabled}
            disabled={item.disabled}
            className={item.disabled ? "cursor-not-allowed opacity-50" : ""}
          >
            {item.disabled ? (
              <div 
                className="flex w-full items-center cursor-not-allowed"
                onClick={() => handleDisabledClick(item.label)}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </div>
            ) : (
              <Link to={item.path} className="flex w-full cursor-pointer items-center">
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserMenu;
