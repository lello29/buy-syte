
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
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

  if (!currentUser) {
    console.log("MobileDashboard: No user found");
    return (
      <div className="p-4 text-center">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-lg font-semibold mb-2">Sessione scaduta</p>
          <p className="mb-4">Effettua il login per continuare</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Vai al login
          </button>
        </div>
      </div>
    );
  }

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
            key={`dashboard-option-${index}`}
            label={option.label}
            icon={<option.icon className="h-6 w-6 text-[#0a3276]" />}
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
          <React.Fragment key={`additional-option-${index}`}>
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
