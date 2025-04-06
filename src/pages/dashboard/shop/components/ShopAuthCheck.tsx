
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { Loader2 } from "lucide-react";
import { Shop } from "@/types";

interface ShopAuthCheckProps {
  children: React.ReactNode;
}

const ShopAuthCheck: React.FC<ShopAuthCheckProps> = ({ children }) => {
  const { currentUser, getUserShop } = useAuth();
  const [shop, setShop] = useState<Shop | undefined | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchShop = async () => {
      if (currentUser && currentUser.role === "shop") {
        try {
          const shopData = await getUserShop();
          setShop(shopData);
        } catch (error) {
          console.error("Error fetching shop data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchShop();
  }, [currentUser, getUserShop]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Caricamento dati negozio...</span>
      </div>
    );
  }
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">Accesso non autorizzato</h2>
      <p className="text-muted-foreground">
        Questa sezione è riservata agli account negozio.
      </p>
    </div>;
  }
  
  if (!shop) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Negozio non configurato</h2>
        <p className="text-muted-foreground mb-6">
          Il tuo account negozio non è ancora associato a un profilo negozio. 
          Contatta l'amministratore per configurare il tuo profilo.
        </p>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default ShopAuthCheck;
