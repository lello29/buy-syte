
import React from "react";
import DashboardCard from "../cards/DashboardCard";
import { Users, Store, User, Package } from "lucide-react";
import { getUsersByRole, shops, products, collaborators } from "@/data/mockData";
import RecentShopsCard from "./recent-shops/RecentShopsCard";
import RecentActivitiesCard from "./activity/RecentActivitiesCard";
import GlobalStatisticsCard from "./statistics/GlobalStatisticsCard";

const AdminDashboard: React.FC = () => {
  const allUsers = getUsersByRole("user").length;
  const allShops = shops.length;
  const allProducts = products.length;
  
  return (
    <div className="space-y-6">
      {/* Summary cards section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Utenti"
          description="Utenti registrati"
          value={allUsers.toString()}
          icon={<Users className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/users"
        />
        
        <DashboardCard
          title="Negozi"
          description="Negozi attivi"
          value={allShops.toString()}
          icon={<Store className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/shops"
        />
        
        <DashboardCard
          title="Collaboratori"
          description="Collaboratori registrati"
          value={collaborators.length.toString()}
          icon={<User className="h-8 w-8 text-purple-600" />}
          linkTo="/dashboard/admin-collaborators"
        />
        
        <DashboardCard
          title="Prodotti"
          description="Prodotti totali"
          value={allProducts.toString()}
          icon={<Package className="h-8 w-8 text-orange-600" />}
          linkTo="/dashboard/admin-products"
        />
      </div>

      {/* Recent shops and activities */}
      <div className="grid gap-6 md:grid-cols-2">
        <RecentShopsCard shops={shops} />
        <RecentActivitiesCard />
      </div>

      {/* Global statistics */}
      <GlobalStatisticsCard shops={shops} products={products} />
    </div>
  );
};

export default AdminDashboard;
