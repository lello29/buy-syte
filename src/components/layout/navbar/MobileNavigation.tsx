
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, UserPlus, Home, Store, UserCircle, BarChart3 } from "lucide-react";
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log("MobileNavigation rendered", { 
      isOpen: mobileMenuOpen, 
      simplified,
      hasUser: !!currentUser
    });
  }, [mobileMenuOpen, simplified, currentUser]);

  if (!mobileMenuOpen) return null;

  // Function to show toast for unavailable features
  const handleNotAvailable = (featureName: string) => {
    toast({
      title: "Funzione non disponibile",
      description: `La funzione "${featureName}" non è ancora disponibile.`,
      variant: "destructive",
    });
  };

  const handleDashboardClick = () => {
    try {
      setMobileMenuOpen(false);
      
      // Ensure we navigate to the correct dashboard based on role
      setTimeout(() => {
        if (currentUser?.role === "admin") {
          navigate("/dashboard/admin");
        } else {
          navigate("/dashboard");
        }
      }, 50);
    } catch (error) {
      console.error("Errore durante la navigazione:", error);
    }
  };

  return (
    <div className="md:hidden bg-white border-t border-gray-200 py-2 z-50">
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
              {/* Rimosso il link alle offerte */}
            </>
          )}
          
          {currentUser ? (
            <>
              {simplified ? (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <MobileNavbarUserMenu setMobileMenuOpen={setMobileMenuOpen} />
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={handleDashboardClick}
                  >
                    {currentUser.role === "admin" ? (
                      <>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard Admin
                      </>
                    ) : (
                      <>
                        <UserCircle className="h-4 w-4 mr-2" />
                        Dashboard
                      </>
                    )}
                  </Button>
                </>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }} 
                className="w-full justify-start"
              >
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
