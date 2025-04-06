
import React, { createContext, useContext } from "react";
import { Home, ShoppingBag, ShoppingCart, Users, Settings, List, PlusCircle, CreditCard, Bell, ShoppingBasket, BarChart3, Building2, User } from "lucide-react";

// Definizione del tipo per le opzioni di menu
interface MenuOption {
  label: string;
  icon: React.FC<any>;
  path: string;
  available: boolean;
}

// Definizione del tipo per il contesto del menu
interface RoleMenuContextType {
  dashboardOptions: MenuOption[];
  additionalOptions: MenuOption[];
  actionButton: MenuOption;
}

// Creazione del contesto
const RoleMenuContext = createContext<RoleMenuContextType | undefined>(undefined);

/**
 * Hook per accedere al menu in base al ruolo dell'utente
 */
export const useRoleMenu = (userRole: string = 'user', isAdminSection: boolean = false) => {
  const getMenuOptions = () => {
    // Menu per gli amministratori
    if (userRole === "admin") {
      // Se l'utente è nella sezione amministrativa
      if (isAdminSection) {
        return {
          dashboardOptions: [
            { label: "Dashboard", icon: Home, path: "/dashboard/admin", available: true },
            { label: "Utenti", icon: Users, path: "/dashboard/admin/users", available: true },
            { label: "Negozi", icon: Store, path: "/dashboard/admin/shops", available: true },
            { label: "Prodotti", icon: ShoppingBag, path: "/dashboard/admin/products", available: true },
            { label: "Impostazioni", icon: Settings, path: "/dashboard/admin/settings", available: true },
            { label: "Collaboratori", icon: Users, path: "/dashboard/admin/collaborators", available: true },
          ],
          additionalOptions: [
            { label: "Statistiche", icon: BarChart3, path: "/dashboard/admin/stats", available: false },
            { label: "Account", icon: User, path: "/dashboard/profile", available: true },
            { label: "Esci dalla sezione admin", icon: LogOut, path: "/dashboard", available: true },
          ],
          actionButton: {
            label: "Nuovo Negozio",
            path: "/dashboard/admin/shops/new",
            icon: PlusCircle,
            available: false,
          },
        };
      } else {
        // Se l'amministratore è nella sezione utente
        return {
          dashboardOptions: [
            { label: "Dashboard", icon: Home, path: "/dashboard", available: true },
            { label: "I miei ordini", icon: ShoppingCart, path: "/dashboard/orders", available: true },
            { label: "Punti fedeltà", icon: CreditCard, path: "/dashboard/loyalty", available: true },
            { label: "Preferiti", icon: Heart, path: "/dashboard/favorites", available: true },
          ],
          additionalOptions: [
            { label: "Profilo", icon: User, path: "/dashboard/profile", available: true },
            { label: "Dashboard Admin", icon: BarChart3, path: "/dashboard/admin", available: true },
            { label: "Diventa un negoziante", icon: Building2, path: "/dashboard/profile/convert-to-shop", available: true },
          ],
          actionButton: {
            label: "Acquista Ora",
            path: "/shops",
            icon: ShoppingBag,
            available: true,
          },
        };
      }
    }
    // Menu per i negozianti
    else if (userRole === "shop") {
      return {
        dashboardOptions: [
          { label: "Dashboard", icon: Home, path: "/dashboard", available: true },
          { label: "Prodotti", icon: ShoppingBag, path: "/dashboard/shop/products", available: true },
          { label: "Clienti", icon: Users, path: "/dashboard/shop/customers", available: true },
          { label: "Analisi", icon: BarChart3, path: "/dashboard/shop/analytics", available: true },
          { label: "Impostazioni", icon: Settings, path: "/dashboard/shop/settings", available: true },
        ],
        additionalOptions: [
          { label: "Ordini", icon: ShoppingCart, path: "/dashboard/shop/orders", available: false },
          { label: "Notifiche", icon: Bell, path: "/dashboard/shop/notifications", available: false },
          { label: "Profilo Personale", icon: User, path: "/dashboard/profile", available: true },
        ],
        actionButton: {
          label: "Nuovo Prodotto",
          path: "/dashboard/shop/products/new",
          icon: PlusCircle,
          available: true,
        },
      };
    }
    // Menu per i collaboratori
    else if (userRole === "collaborator") {
      return {
        dashboardOptions: [
          { label: "Dashboard", icon: Home, path: "/dashboard", available: true },
          { label: "I miei negozi", icon: Store, path: "/dashboard/collaborator/shops", available: false },
          { label: "Attività", icon: List, path: "/dashboard/collaborator/tasks", available: true },
          { label: "Guadagni", icon: CreditCard, path: "/dashboard/collaborator/earnings", available: false },
        ],
        additionalOptions: [
          { label: "Notifiche", icon: Bell, path: "/dashboard/collaborator/notifications", available: false },
          { label: "Profilo", icon: User, path: "/dashboard/profile", available: true },
        ],
        actionButton: {
          label: "Cerca Negozi",
          path: "/shops",
          icon: Store,
          available: true,
        },
      };
    }
    // Menu per gli utenti normali
    else {
      return {
        dashboardOptions: [
          { label: "Dashboard", icon: Home, path: "/dashboard", available: true },
          { label: "I miei ordini", icon: ShoppingCart, path: "/dashboard/orders", available: true },
          { label: "Punti fedeltà", icon: CreditCard, path: "/dashboard/loyalty", available: true },
          { label: "Preferiti", icon: Heart, path: "/dashboard/favorites", available: true },
        ],
        additionalOptions: [
          { label: "Profilo", icon: User, path: "/dashboard/profile", available: true },
          { label: "Diventa un negoziante", icon: Building2, path: "/dashboard/profile/convert-to-shop", available: true },
          { label: "Diventa un collaboratore", icon: Users, path: "/dashboard/profile/convert-to-collaborator", available: true },
        ],
        actionButton: {
          label: "Acquista Ora",
          path: "/shops",
          icon: ShoppingBasket,
          available: true,
        },
      };
    }
  };

  return getMenuOptions();
};

// Provider component
export const RoleMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default menu for un-authenticated users
  const defaultValue: RoleMenuContextType = {
    dashboardOptions: [],
    additionalOptions: [],
    actionButton: {
      label: "",
      icon: Home,
      path: "/",
      available: true,
    },
  };

  return (
    <RoleMenuContext.Provider value={defaultValue}>
      {children}
    </RoleMenuContext.Provider>
  );
};

// Import missing Heart icon
import { Heart } from "lucide-react";

export default RoleMenuProvider;
