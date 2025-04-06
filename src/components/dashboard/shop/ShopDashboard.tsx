
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "../cards/DashboardCard";
import { Package, Calendar, ShoppingBag, DollarSign, ChevronRight, Settings } from "lucide-react";
import { getProductsByShopId, shops } from "@/data/mockData";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  const shopProducts = getProductsByShopId(shop.id);
  const recentProducts = shopProducts.slice(0, 5);
  
  const todayOrders = Math.floor(Math.random() * 10) + 1;
  const totalSales = Math.floor(Math.random() * 10000) + 1000;
  const reservations = Math.floor(Math.random() * 10) + 1;

  const handleAddProduct = () => {
    // Assicuriamoci che la navigazione funzioni correttamente indipendentemente dalla piattaforma
    try {
      navigate("/dashboard/products/add");
      console.log("Navigazione verso /dashboard/products/add");
    } catch (error) {
      console.error("Errore durante la navigazione:", error);
      toast.error("Impossibile accedere alla pagina di aggiunta prodotto");
    }
  };

  const handleManageCategories = () => {
    const manageCategoriesButton = document.getElementById("manage-categories-button");
    if (manageCategoriesButton) {
      manageCategoriesButton.click();
    } else {
      toast.error("Impossibile aprire la gestione categorie");
    }
  };
  
  return (
    <div className="space-y-6 max-w-md mx-auto md:max-w-none pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Negozio: {shop.name}</h1>
        
        {!isMobile && (
          <Link to="/dashboard/shop-settings">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Impostazioni Negozio
            </Button>
          </Link>
        )}
      </div>
      
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

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Button 
          variant="primary" 
          size="lg" 
          className="justify-center text-lg py-6"
          onClick={handleAddProduct}
        >
          Aggiungi Prodotto
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          className="justify-center text-lg py-6"
          onClick={handleManageCategories}
        >
          Gestisci Categorie
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Ultimi Prodotti</h2>
          <Link to="/dashboard/products">
            <Button variant="ghost" size="sm">
              Vedi tutti <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
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
      
      {isMobile && (
        <div className="mt-8">
          <Link to="/dashboard/shop-settings">
            <Button variant="outline" className="w-full justify-center">
              <Settings className="h-4 w-4 mr-2" />
              Impostazioni Negozio
            </Button>
          </Link>
        </div>
      )}

      <div className="hidden">
        <ProductCategoriesManager 
          categories={["Abbigliamento", "Accessori", "Elettronica", "Casa", "Sport", "Bellezza"]} 
        />
      </div>
    </div>
  );
};

export default ShopDashboard;
