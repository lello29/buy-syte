
import { useState } from 'react';
import { Shop } from '@/types';
import { toast } from "sonner";

export const useShopLocation = (
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>
) => {
  const [isLocating, setIsLocating] = useState(false);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          setSelectedShop(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              location: { latitude, longitude }
            };
          });
          
          toast.success('Posizione rilevata con successo');
          setIsLocating(false);
        },
        (error) => {
          toast.error(`Errore nel rilevamento della posizione: ${error.message}`);
          setIsLocating(false);
        }
      );
    } else {
      toast.error('Geolocalizzazione non supportata dal browser');
    }
  };

  return {
    handleGetLocation,
    isLocating
  };
};
