
import React from "react";
import { Link } from "react-router-dom";
import { Store, Users, User, Package, Plus, ChevronRight } from "lucide-react";

const MobileDashboard = () => {
  // Opzioni principali della dashboard con icone
  const dashboardOptions = [
    { 
      label: "Negozi", 
      icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
      path: "/dashboard/admin-shops" 
    },
    { 
      label: "Utenti", 
      icon: <Users className="h-16 w-16 text-[#0a3276]" />, 
      path: "/dashboard/users" 
    },
    { 
      label: "Collaboratori", 
      icon: <User className="h-16 w-16 text-[#0a3276]" />, 
      path: "/dashboard/admin-collaborators" 
    },
    { 
      label: "Prodotti", 
      icon: <Package className="h-16 w-16 text-[#0a3276]" />, 
      path: "/dashboard/admin-products" 
    }
  ];

  // Opzioni aggiuntive (liste semplici)
  const additionalOptions = [
    { label: "Ostoggor", path: "/dashboard/ostoggor" },
    { label: "Avvio piodotct", path: "/dashboard/avvio-piodotct" }
  ];

  return (
    <div className="space-y-4">
      {/* Menu tile principale */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardOptions.map((option, index) => (
          <Link 
            key={index} 
            to={option.path}
            className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center text-center"
          >
            {option.icon}
            <span className="text-xl font-bold text-[#0a3276] mt-2">{option.label}</span>
          </Link>
        ))}
      </div>

      {/* Pulsante aggiunta prodotto */}
      <Link 
        to="/dashboard/add-product"
        className="bg-[#3b7afc] text-white rounded-lg py-4 flex items-center justify-center my-4 shadow-sm"
      >
        <Plus className="h-6 w-6 mr-2" />
        <span className="text-xl font-semibold">Aggiungi prodotto</span>
      </Link>

      {/* Lista opzioni aggiuntive */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {additionalOptions.map((option, index) => (
          <React.Fragment key={index}>
            <Link 
              to={option.path}
              className="p-4 flex items-center justify-between border-b border-gray-100 last:border-0"
            >
              <span className="text-xl font-semibold">{option.label}</span>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </Link>
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
