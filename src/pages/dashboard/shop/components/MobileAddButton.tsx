
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MobileAddButtonProps {
  onClick: () => void;
}

const MobileAddButton: React.FC<MobileAddButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-10">
      <Button 
        size="icon" 
        className="h-14 w-14 rounded-full shadow-lg bg-primary text-white hover:bg-primary/90"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MobileAddButton;
