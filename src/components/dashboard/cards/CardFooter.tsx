
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CardFooterProps {
  linkTo: string;
  buttonText?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ 
  linkTo,
  buttonText = "Visualizza dettagli" 
}) => {
  return (
    <div className="mt-4">
      <Link to={linkTo}>
        <Button variant="ghost" size="sm" className="w-full justify-between">
          {buttonText}
          <span>→</span>
        </Button>
      </Link>
    </div>
  );
};

export default CardFooter;
