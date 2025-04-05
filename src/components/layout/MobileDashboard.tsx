
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Users, User, Package, Plus, ChevronRight, BarChart3, Heart, ShoppingBag, Award, Calendar, Bell, CreditCard, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const MobileDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null;

  // Determina le opzioni del menu in base al ruolo dell'utente
  const getDashboardOptions = () => {
    const role = currentUser.role;

    switch (role) {
      case "admin":
        return [
          { 
            label: "Dashboard", 
            icon: <BarChart3 className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin" 
          },
          { 
            label: "Utenti", 
            icon: <Users className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/users" 
          },
          { 
            label: "Negozi", 
            icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-shops" 
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
      case "shop":
        return [
          { 
            label: "Dashboard", 
            icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard" 
          },
          { 
            label: "Prodotti", 
            icon: <Package className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/products" 
          },
          { 
            label: "Ordini", 
            icon: <CreditCard className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/shop-orders" 
          },
          { 
            label: "Offerte", 
            icon: <Calendar className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/offers" 
          }
        ];
      case "collaborator":
        return [
          { 
            label: "Profilo", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard" 
          },
          { 
            label: "Incarichi", 
            icon: <Briefcase className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/tasks" 
          },
          { 
            label: "Disponibilità", 
            icon: <Calendar className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/availability" 
          },
          { 
            label: "Recensioni", 
            icon: <Award className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/reviews" 
          }
        ];
      case "user":
      default:
        return [
          { 
            label: "Profilo", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard" 
          },
          { 
            label: "Preferiti", 
            icon: <Heart className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/favorites" 
          },
          { 
            label: "Ordini", 
            icon: <ShoppingBag className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/orders" 
          },
          { 
            label: "Punti Fedeltà", 
            icon: <Award className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/loyalty" 
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
          { label: "Impostazioni", path: "/dashboard/admin/settings" },
          { label: "Gestione Sistema", path: "/dashboard/admin/system" }
        ];
      case "shop":
        return [
          { label: "Notifiche", path: "/dashboard/notifications" },
          { label: "Collaboratori", path: "/dashboard/collaborators" },
          { label: "Impostazioni", path: "/dashboard/shop-settings" }
        ];
      case "collaborator":
        return [
          { label: "Notifiche", path: "/dashboard/notifications" },
          { label: "Impostazioni", path: "/dashboard/settings" }
        ];
      case "user":
      default:
        return [
          { label: "Diventa Negozio", path: "/dashboard/convert-shop" },
          { label: "Diventa Collaboratore", path: "/dashboard/convert-collaborator" },
          { label: "Impostazioni", path: "/dashboard/settings" }
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
          path: "/dashboard/admin-shops/add"
        };
      case "shop":
        return {
          label: "Aggiungi prodotto",
          path: "/dashboard/products/add"
        };
      case "collaborator":
        return {
          label: "Aggiungi disponibilità",
          path: "/dashboard/availability/add"
        };
      case "user":
      default:
        return {
          label: "Esplora negozi",
          path: "/shops"
        };
    }
  };

  const dashboardOptions = getDashboardOptions();
  const additionalOptions = getAdditionalOptions();
  const actionButton = getActionButton();

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

      {/* Pulsante azione principale */}
      <Link 
        to={actionButton.path}
        className="bg-[#3b7afc] text-white rounded-lg py-4 flex items-center justify-center my-4 shadow-sm"
      >
        <Plus className="h-6 w-6 mr-2" />
        <span className="text-xl font-semibold">{actionButton.label}</span>
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
