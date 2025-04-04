
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Home, LogOut } from "lucide-react";

import MobileNavigation from "./navbar/MobileNavigation";

const Navbar = ({ simplified = false }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/eb9eb2f3-24f5-4273-bab4-45b921b6aa64.png" 
              alt="BuySite Logo" 
              className="h-10" 
            />
          </Link>

          {/* Desktop navigation - simplified for dashboard */}
          {currentUser && simplified && (
            <div className="hidden md:flex space-x-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          )}

          {/* Standard desktop navigation for non-simplified mode */}
          {(!simplified || !currentUser) && (
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
              <Link to="/shops" className="text-gray-600 hover:text-primary">Negozi</Link>
              <Link to="/offers" className="text-gray-600 hover:text-primary">Offerte</Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Auth actions for desktop - non-dashboard mode */}
          {!simplified && (
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm">Login</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Registrati</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNavigation 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
        handleLogout={handleLogout}
        simplified={simplified}
      />
    </nav>
  );
};

export default Navbar;
