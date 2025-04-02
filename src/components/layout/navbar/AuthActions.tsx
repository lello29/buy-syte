
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import NavbarUserMenu from "./NavbarUserMenu";

interface AuthActionsProps {
  handleLogout: () => void;
}

const AuthActions = ({ handleLogout }: AuthActionsProps) => {
  const { currentUser } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      {currentUser ? (
        <>
          <NavbarUserMenu />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Registrati
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthActions;
