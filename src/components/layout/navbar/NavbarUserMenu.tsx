
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { getMenuItems } from "./menuItems";

const NavbarUserMenu = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;

  const menuItems = getMenuItems(currentUser);

  return (
    <div className="flex items-center space-x-2">
      {menuItems.map((item, index) => (
        <Link key={index} to={item.path}>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "flex items-center",
              location.pathname === item.path && "bg-primary/10"
            )}
          >
            <item.icon className="h-4 w-4 mr-1" />
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavbarUserMenu;
