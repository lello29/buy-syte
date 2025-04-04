
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface CardFooterProps {
  linkTo: string;
  buttonText?: string;
  variant?: "default" | "primary" | "full";
  rightIcon?: React.ReactNode;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  linkTo,
  buttonText = "Visualizza dettagli",
  variant = "default",
  rightIcon = <ChevronRight className="h-5 w-5" />
}) => {
  if (variant === "full") {
    return (
      <div className="mt-4">
        <Link to={linkTo} className="block">
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full justify-center text-lg py-6"
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Link to={linkTo}>
        <Button 
          variant={variant === "primary" ? "secondary" : "ghost"} 
          size="sm" 
          className="w-full justify-between"
        >
          {buttonText}
          {rightIcon}
        </Button>
      </Link>
    </div>
  );
};

export default CardFooter;
