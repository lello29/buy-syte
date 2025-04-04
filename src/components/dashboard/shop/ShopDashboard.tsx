
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "../cards/DashboardCard";
import { Package, Calendar, ShoppingBag, DollarSign, ChevronRight } from "lucide-react";
import { getProductsByShopId, shops } from "@/data/mockData";
import { toast } from "sonner";

interface ShopDashboardProps {
  userId: string;
}

const RecentProductItem = ({ product }: { product: any }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="h-16 w-16 bg-gray-100 rounded-lg mr-4 overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-lg font-bold">€ {product.price.toFixed(2)}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

const ShopDashboard: React.FC<ShopDashboardProps> = ({ userId }) => {
  const shop = shops.find(shop => shop.userId === userId);
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  const shopProducts = getProductsByShopId(shop.id);
  const recentProducts = shopProducts.slice(0, 5);
  
  // Simulate some orders and sales data
  const todayOrders = Math.floor(Math.random() * 10) + 1;
  const totalSales = Math.floor(Math.random() * 10000) + 1000;
  const reservations = Math.floor(Math.random() * 10) + 1;

  const handleAddProduct = () => {
    toast.info("Funzionalità di aggiunta prodotto in arrivo!");
  };
  
  return (
    <div className="space-y-6 max-w-md mx-auto md:max-w-none pb-20">
      {/* Header with shop name and logout */}
      <div className="bg-primary text-white p-4 -mx-4 -mt-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Negozio</h1>
          <Button variant="ghost" className="text-white hover:bg-white/20">
            Logout
          </Button>
        </div>
      </div>
      
      {/* Summary cards section */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
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
          title="Domande Prenotazione"
          description=""
          value={reservations.toString()}
          icon={<ShoppingBag />}
          linkTo="/dashboard/reservations"
          iconPosition="left"
          showFooter={false}
          className="col-span-1"
        />
      </div>

      {/* Add Product Button */}
      <div className="mt-8">
        <Button 
          variant="primary" 
          size="lg" 
          className="w-full justify-center text-lg py-6"
          onClick={handleAddProduct}
        >
          Aggiungi Prodotto
        </Button>
      </div>

      {/* Recent Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Ultimi Prodotti</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            {recentProducts.length > 0 ? (
              <div>
                {recentProducts.map((product) => (
                  <Link to={`/dashboard/products/${product.id}`} key={product.id}>
                    <RecentProductItem product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="text-gray-500 mb-4">Non hai ancora aggiunto prodotti.</p>
                <Button onClick={handleAddProduct}>Aggiungi Prodotto</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShopDashboard;
