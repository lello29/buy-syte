
import React, { useState } from "react";
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
import RecentOrders from "./components/RecentOrders";
import PromotionBanner from "./components/PromotionBanner";
import InventoryAlert from "./components/InventoryAlert";
import MobileFooter from "./components/MobileFooter";

interface ShopDashboardProps {
  userId: string;
}

const ShopDashboard: React.FC<ShopDashboardProps> = ({ userId }) => {
  const shop = shops.find(shop => shop.userId === userId);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Mock data for notifications
  const [notificationCount] = useState(3);
  
  // Mock data for inventory alerts
  const [lowStockCount] = useState(2);
  
  // Mock data for recent orders
  const mockOrders = [
    {
      id: "order1",
      customerName: "Marco Rossi",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
      total: 85.50,
      status: 'pending' as const
    },
    {
      id: "order2",
      customerName: "Giulia Bianchi",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      total: 125.00,
      status: 'completed' as const
    },
    {
      id: "order3",
      customerName: "Antonio Verdi",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      total: 67.20,
      status: 'processing' as const
    }
  ];
  
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
      navigate("/dashboard/products");
      console.log("Navigazione verso /dashboard/products");
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
        notificationCount={notificationCount}
      />
      
      {/* Alert per prodotti con scorte basse */}
      <InventoryAlert lowStockCount={lowStockCount} />
      
      <ShopStats 
        shopProducts={shopProducts} 
        todayOrders={todayOrders} 
        totalSales={totalSales} 
        reservations={reservations} 
      />

      {/* Banner promozionale */}
      <PromotionBanner />

      <ShopActionButtons 
        onAddProduct={handleAddProduct} 
        onManageCategories={handleManageCategories} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentProducts 
          recentProducts={recentProducts} 
          onAddProduct={handleAddProduct} 
        />
        
        <RecentOrders orders={mockOrders} />
      </div>
      
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
