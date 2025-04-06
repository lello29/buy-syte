
import React from "react";
import { Button } from "@/components/ui/button";

interface CollaboratorsFilterProps {
  statusFilter: "all" | "active" | "inactive";
  onFilterChange: (filter: "all" | "active" | "inactive") => void;
}

const CollaboratorsFilter = ({ 
  statusFilter, 
  onFilterChange 
}: CollaboratorsFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Button 
        variant={statusFilter === "all" ? "default" : "outline"} 
        onClick={() => onFilterChange("all")}
      >
        Tutti
      </Button>
      <Button 
        variant={statusFilter === "active" ? "default" : "outline"} 
        onClick={() => onFilterChange("active")}
      >
        Attivi
      </Button>
      <Button 
        variant={statusFilter === "inactive" ? "default" : "outline"} 
        onClick={() => onFilterChange("inactive")}
      >
        Inattivi
      </Button>
    </div>
  );
};

export default CollaboratorsFilter;
