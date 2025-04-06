
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ShopAuthCheckProps {
  children: React.ReactNode;
}

const ShopAuthCheck: React.FC<ShopAuthCheckProps> = ({ children }) => {
  const { currentUser, getUserShop } = useAuth();
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-2">Accesso non autorizzato</h2>
      <p className="text-muted-foreground">
        Questa sezione è riservata agli account negozio.
      </p>
    </div>;
  }
  
  const shop = getUserShop();
  
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
