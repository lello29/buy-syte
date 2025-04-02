
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import MobileNavbarUserMenu from "./MobileNavbarUserMenu";

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
}

const MobileNavigation = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  handleLogout 
}: MobileNavigationProps) => {
  const { currentUser } = useAuth();

  if (!mobileMenuOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className="text-gray-600 hover:text-primary py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shops" 
            className="text-gray-600 hover:text-primary py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Negozi
          </Link>
          <Link 
            to="/offers" 
            className="text-gray-600 hover:text-primary py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Offerte
          </Link>
          
          {currentUser ? (
            <>
              <MobileNavbarUserMenu setMobileMenuOpen={setMobileMenuOpen} />
              <Button variant="outline" size="sm" onClick={handleLogout} className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Registrati
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
