
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, UserPlus, Home, AlertTriangle, Store, Tag, UserCircle } from "lucide-react";
import MobileNavbarUserMenu from "./MobileNavbarUserMenu";
import { toast } from "@/hooks/use-toast";

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  handleLogout: () => void;
  simplified?: boolean;
}

const MobileNavigation = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  handleLogout,
  simplified = false
}: MobileNavigationProps) => {
  const { currentUser } = useAuth();

  if (!mobileMenuOpen) return null;

  // Function to show toast for unavailable features
  const handleNotAvailable = (featureName: string) => {
    toast({
      title: "Funzione non disponibile",
      description: `La funzione "${featureName}" non è ancora disponibile.`,
      variant: "destructive",
    });
  };

  return (
    <div className="md:hidden bg-white border-t border-gray-200 py-2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-3">
          {!simplified && (
            <>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-primary py-2 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link 
                to="/shops" 
                className="text-gray-600 hover:text-primary py-2 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Store className="h-4 w-4 mr-2" />
                Negozi
              </Link>
              <Link 
                to="/offers" 
                className="text-gray-600 hover:text-primary py-2 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Tag className="h-4 w-4 mr-2" />
                Offerte
              </Link>
            </>
          )}
          
          {currentUser ? (
            <>
              {simplified ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <MobileNavbarUserMenu setMobileMenuOpen={setMobileMenuOpen} />
                </div>
              ) : (
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <UserCircle className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
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
