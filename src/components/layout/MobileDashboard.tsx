
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Users, User, Package, Plus, ChevronRight, BarChart3, Heart, ShoppingBag, Award, Calendar, Bell, CreditCard, Briefcase, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const MobileDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  // Show a toast for features that are not yet available
  const handleNotAvailable = (featureName: string) => {
    toast({
      title: "Funzione non disponibile",
      description: `La funzione "${featureName}" non è ancora disponibile.`,
      variant: "destructive",
    });
  };

  // Determina le opzioni del menu in base al ruolo dell'utente
  const getDashboardOptions = () => {
    const role = currentUser.role;

    switch (role) {
      case "admin":
        return [
          { 
            label: "Dashboard", 
            icon: <BarChart3 className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin",
            available: true
          },
          { 
            label: "Utenti", 
            icon: <Users className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/users",
            available: true
          },
          { 
            label: "Negozi", 
            icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-shops",
            available: true
          },
          { 
            label: "Collaboratori", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-collaborators",
            available: true
          },
          { 
            label: "Prodotti", 
            icon: <Package className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-products",
            available: true
          }
        ];
      case "shop":
        return [
          { 
            label: "Dashboard", 
            icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard",
            available: true
          },
          { 
            label: "Prodotti", 
            icon: <Package className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/products",
            available: true
          },
          { 
            label: "Ordini", 
            icon: <CreditCard className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/shop-orders",
            available: true
          },
          { 
            label: "Offerte", 
            icon: <Calendar className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/offers",
            available: false
          }
        ];
      case "collaborator":
        return [
          { 
            label: "Profilo", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard",
            available: true
          },
          { 
            label: "Incarichi", 
            icon: <Briefcase className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/tasks",
            available: false
          },
          { 
            label: "Disponibilità", 
            icon: <Calendar className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/availability",
            available: false
          },
          { 
            label: "Recensioni", 
            icon: <Award className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/reviews",
            available: false
          }
        ];
      case "user":
      default:
        return [
          { 
            label: "Profilo", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard",
            available: true
          },
          { 
            label: "Preferiti", 
            icon: <Heart className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/favorites",
            available: true
          },
          { 
            label: "Ordini", 
            icon: <ShoppingBag className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/orders",
            available: true
          },
          { 
            label: "Punti Fedeltà", 
            icon: <Award className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/loyalty",
            available: false
          }
        ];
    }
  };

  // Determina le opzioni aggiuntive in base al ruolo
  const getAdditionalOptions = () => {
    const role = currentUser.role;

    switch (role) {
      case "admin":
        return [
          { label: "Impostazioni", path: "/dashboard/admin/settings", available: true },
          { label: "Gestione Sistema", path: "/dashboard/admin/system", available: false }
        ];
      case "shop":
        return [
          { label: "Notifiche", path: "/dashboard/notifications", available: false },
          { label: "Collaboratori", path: "/dashboard/collaborators", available: false },
          { label: "Impostazioni", path: "/dashboard/shop-settings", available: true }
        ];
      case "collaborator":
        return [
          { label: "Notifiche", path: "/dashboard/notifications", available: false },
          { label: "Impostazioni", path: "/dashboard/settings", available: false }
        ];
      case "user":
      default:
        return [
          { label: "Diventa Negozio", path: "/dashboard/convert-shop", available: true },
          { label: "Diventa Collaboratore", path: "/dashboard/convert-collaborator", available: true },
          { label: "Impostazioni", path: "/dashboard/settings", available: false }
        ];
    }
  };

  // Determina il pulsante di azione principale in base al ruolo
  const getActionButton = () => {
    const role = currentUser.role;

    switch (role) {
      case "admin":
        return {
          label: "Aggiungi negozio",
          path: "/dashboard/admin-shops/add",
          available: false
        };
      case "shop":
        return {
          label: "Aggiungi prodotto",
          path: "/dashboard/products/add",
          available: true
        };
      case "collaborator":
        return {
          label: "Aggiungi disponibilità",
          path: "/dashboard/availability/add",
          available: false
        };
      case "user":
      default:
        return {
          label: "Esplora negozi",
          path: "/shops",
          available: true
        };
    }
  };

  const dashboardOptions = getDashboardOptions();
  const additionalOptions = getAdditionalOptions();
  const actionButton = getActionButton();

  // Handling link click with availability check
  const handleLinkClick = (e: React.MouseEvent, available: boolean, label: string) => {
    if (!available) {
      e.preventDefault();
      handleNotAvailable(label);
    }
  };

  return (
    <div className="space-y-6">
      {/* Menu tile principale */}
      <div className="grid grid-cols-2 gap-4">
        {dashboardOptions.map((option, index) => (
          <Link 
            key={index} 
            to={option.path}
            onClick={(e) => handleLinkClick(e, option.available, option.label)}
            className={`bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center text-center transition-transform ${option.available ? 'hover:shadow-md hover:-translate-y-1' : 'opacity-80'}`}
          >
            {option.icon}
            <span className="text-lg font-bold text-[#0a3276] mt-2">{option.label}</span>
            {!option.available && (
              <div className="flex items-center mt-1 text-amber-600 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>Non disponibile</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Pulsante azione principale */}
      <Link 
        to={actionButton.path}
        onClick={(e) => handleLinkClick(e, actionButton.available, actionButton.label)}
        className={`bg-[#3b7afc] text-white rounded-lg py-4 flex items-center justify-center my-6 shadow-sm transition-all ${actionButton.available ? 'hover:bg-[#2c5fc9] hover:shadow-md' : 'opacity-80'}`}
      >
        <Plus className="h-6 w-6 mr-2" />
        <span className="text-xl font-semibold">{actionButton.label}</span>
        {!actionButton.available && (
          <div className="flex items-center ml-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Non disponibile</span>
          </div>
        )}
      </Link>

      {/* Lista opzioni aggiuntive */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {additionalOptions.map((option, index) => (
          <React.Fragment key={index}>
            <Link 
              to={option.path}
              onClick={(e) => handleLinkClick(e, option.available, option.label)}
              className={`p-4 flex items-center justify-between border-b border-gray-100 last:border-0 ${option.available ? 'hover:bg-gray-50' : 'opacity-80'}`}
            >
              <span className="text-xl font-semibold">{option.label}</span>
              <div className="flex items-center">
                {!option.available && (
                  <span className="text-xs text-amber-600 mr-2">Non disponibile</span>
                )}
                <ChevronRight className="h-6 w-6 text-gray-400" />
              </div>
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
