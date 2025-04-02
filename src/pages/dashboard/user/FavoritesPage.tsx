
import React from "react";
import FavoritesCard from "@/components/dashboard/FavoritesCard";
import { useAuth } from "@/contexts/AuthContext";

const FavoritesPage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">I Miei Preferiti</h1>
      <p className="text-gray-600">
        Gestisci i negozi che segui per ricevere offerte e aggiornamenti.
      </p>
      
      <div className="mt-6">
        <FavoritesCard />
      </div>
    </div>
  );
};

export default FavoritesPage;
