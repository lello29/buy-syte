
import React from "react";
import { Button } from "@/components/ui/button";

// Define the filter status type
export type CollaboratorStatusFilter = "all" | "active" | "inactive";

export interface CollaboratorsFilterProps {
  statusFilter: CollaboratorStatusFilter;
  onFilterChange: (filter: CollaboratorStatusFilter) => void;
}

const CollaboratorsFilter: React.FC<CollaboratorsFilterProps> = ({ 
  statusFilter, 
  onFilterChange 
}) => {
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
