
import React from "react";
import DashboardCard from "../../cards/DashboardCard";
import { Package, Calendar, ShoppingBag, DollarSign } from "lucide-react";

interface ShopStatsProps {
  shopProducts: any[];
  todayOrders: number;
  totalSales: number;
  reservations: number;
}

const ShopStats: React.FC<ShopStatsProps> = ({ 
  shopProducts, 
  todayOrders, 
  totalSales, 
  reservations 
}) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <DashboardCard
        title="Totale Prodotti"
        description=""
        value={shopProducts.length.toString()}
        icon={<Package />}
        linkTo="/dashboard/products"
        iconPosition="left"
        showFooter={false}
        className="col-span-1"
      />
      
      <DashboardCard
        title="Ordini Oggi"
        description=""
        value={todayOrders.toString()}
        icon={<Calendar />}
        variant="primary"
        linkTo="/dashboard/shop-orders"
        iconPosition="left"
        showFooter={false}
        className="col-span-1"
      />
      
      <DashboardCard
        title="Vendite Totali"
        description=""
        value={`€ ${totalSales.toLocaleString('it-IT')}`}
        icon={<DollarSign />}
        variant="primary"
        linkTo="/dashboard/sales"
        iconPosition="left"
        valueSize="large"
        showFooter={false}
        className="col-span-1"
      />
      
      <DashboardCard
        title="Prenotazioni"
        description=""
        value={reservations.toString()}
        icon={<ShoppingBag />}
        linkTo="/dashboard/reservations"
        iconPosition="left"
        showFooter={false}
        className="col-span-1"
      />
    </div>
  );
};

export default ShopStats;
