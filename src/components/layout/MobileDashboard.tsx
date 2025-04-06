
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

// Import the smaller components
import MobileDashboardItem from "./mobile-dashboard/MobileDashboardItem";
import ActionButton from "./mobile-dashboard/ActionButton";
import AdditionalOption from "./mobile-dashboard/AdditionalOption";
import { useRoleMenu } from "./mobile-dashboard/RoleMenuProvider";

const MobileDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Log component mount
  useEffect(() => {
    console.log("MobileDashboard mounted", { currentUser: !!currentUser });
    return () => console.log("MobileDashboard unmounted");
  }, [currentUser]);

  if (!currentUser) return null;

  // Show a toast for features that are not yet available
  const handleNotAvailable = (featureName: string) => {
    toast({
      title: "Funzione non disponibile",
      description: `La funzione "${featureName}" non è ancora disponibile.`,
      variant: "destructive",
    });
  };

  // Get menu options based on user role
  const { dashboardOptions, additionalOptions, actionButton } = useRoleMenu(currentUser.role);

  return (
    <div className="space-y-6">
      {/* Menu tile principale */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardOptions.map((option, index) => (
          <MobileDashboardItem
            key={index}
            label={option.label}
            icon={option.icon}
            path={option.path}
            available={option.available}
            onUnavailable={handleNotAvailable}
          />
        ))}
      </div>

      {/* Pulsante azione principale */}
      <ActionButton
        label={actionButton.label}
        path={actionButton.path}
        available={actionButton.available}
        onUnavailable={handleNotAvailable}
      />

      {/* Lista opzioni aggiuntive */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {additionalOptions.map((option, index) => (
          <React.Fragment key={index}>
            <AdditionalOption
              label={option.label}
              path={option.path}
              available={option.available}
              isLast={index === additionalOptions.length - 1}
              onUnavailable={handleNotAvailable}
            />
            {index < additionalOptions.length - 1 && 
              <div className="border-b border-gray-200 mx-4"></div>
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MobileDashboard;
