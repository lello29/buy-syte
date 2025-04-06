
import React from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByShopId, shops } from "@/data/mockData";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCategoriesManager from "@/components/products/ProductCategoriesManager";

// Importiamo i componenti creati
import ShopHeader from "./components/ShopHeader";
import ShopStats from "./components/ShopStats";
import ShopActionButtons from "./components/ShopActionButtons";
import RecentProducts from "./components/RecentProducts";
import MobileFooter from "./components/MobileFooter";

interface ShopDashboardProps {
  userId: string;
}

const ShopDashboard: React.FC<ShopDashboardProps> = ({ userId }) => {
  const shop = shops.find(shop => shop.userId === userId);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  const shopProducts = getProductsByShopId(shop.id);
  const recentProducts = shopProducts.slice(0, 5);
  
  // Dati simulati
  const todayOrders = Math.floor(Math.random() * 10) + 1;
  const totalSales = Math.floor(Math.random() * 10000) + 1000;
  const reservations = Math.floor(Math.random() * 10) + 1;

  const handleAddProduct = () => {
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
      <ShopHeader 
        shopName={shop.name} 
        isMobile={isMobile} 
      />
      
      <ShopStats 
        shopProducts={shopProducts} 
        todayOrders={todayOrders} 
        totalSales={totalSales} 
        reservations={reservations} 
      />

      <ShopActionButtons 
        onAddProduct={handleAddProduct} 
        onManageCategories={handleManageCategories} 
      />

      <RecentProducts 
        recentProducts={recentProducts} 
        onAddProduct={handleAddProduct} 
      />
      
      <MobileFooter showSettings={isMobile} />

      <div className="hidden">
        <ProductCategoriesManager 
          categories={["Abbigliamento", "Accessori", "Elettronica", "Casa", "Sport", "Bellezza"]} 
        />
      </div>
    </div>
  );
};

export default ShopDashboard;
