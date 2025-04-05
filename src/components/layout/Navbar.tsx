
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import DesktopNavigation from "./navbar/DesktopNavigation";
import MobileNavigation from "./navbar/MobileNavigation";
import AuthActions from "./navbar/AuthActions";
import MobileNavbarUserMenu from "./navbar/MobileNavbarUserMenu";

interface NavbarProps {
  simplified?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ simplified = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Store className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-lg">Buy-sity</span>
          </Link>

          {/* Desktop Navigation */}
          {!simplified && <DesktopNavigation />}

          {/* Auth Actions (Desktop) */}
          <AuthActions handleLogout={handleLogout} />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileNavigation 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleLogout={handleLogout}
          simplified={simplified}
        />
      )}
    </header>
  );
};

export default Navbar;
