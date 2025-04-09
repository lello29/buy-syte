
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Shop } from "@/types";
import { createShop, updateShop } from "@/services/shop";
import { saveShopLocation } from "@/data/shop-utils/shop-location";
import { ShopFormData } from "./types/shopTypes";

const shopSchema = z.object({
  name: z.string().min(2, "Il nome deve essere di almeno 2 caratteri"),
  description: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Inserisci un'email valida").optional().or(z.literal("")),
  category: z.string().optional(),
  fiscalCode: z.string().optional(),
  vatNumber: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  userId: z.string().optional(),
  isActive: z.boolean().optional().default(true),
  isApproved: z.boolean().optional().default(false)
});

export const useShopForm = (shop?: Shop, onSuccess?: () => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(
    shop?.location ? { latitude: shop.location.latitude, longitude: shop.location.longitude } : null
  );

  const form = useForm<ShopFormData>({
    resolver: zodResolver(shopSchema),
    defaultValues: shop ? {
      name: shop.name || "",
      description: shop.description || "",
      address: shop.address || "",
      phone: shop.phone || "",
      email: shop.email || "",
      category: shop.category || "",
      fiscalCode: shop.fiscalCode || "",
      vatNumber: shop.vatNumber || "",
      latitude: shop.location?.latitude || undefined,
      longitude: shop.location?.longitude || undefined,
      userId: shop.userId || "",
      isActive: shop.isActive !== undefined ? shop.isActive : true,
      isApproved: shop.isApproved !== undefined ? shop.isApproved : false
    } : {
      name: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      category: "",
      fiscalCode: "",
      vatNumber: "",
      isActive: true,
      isApproved: false
    }
  });

  // Update form with location when it changes
  useEffect(() => {
    if (location) {
      form.setValue('latitude', location.latitude);
      form.setValue('longitude', location.longitude);
    }
  }, [location, form]);

  const onSubmit = async (data: ShopFormData) => {
    setIsSubmitting(true);
    try {
      if (shop) {
        // Update existing shop
        const updatedShop: Shop = {
          ...shop,
          ...data,
          location: data.latitude && data.longitude ? {
            latitude: data.latitude,
            longitude: data.longitude
          } : null
        };
        
        // Pass false as the second argument to updateShop
        const updated = await updateShop(updatedShop.id, updatedShop);
        
        if (updated) {
          // If the shop has a location, save it separately
          if (updatedShop.location && updatedShop.id) {
            await saveShopLocation(updatedShop.id, updatedShop.location);
          }
          
          toast.success("Negozio aggiornato con successo");
          if (onSuccess) onSuccess();
          return true;
        }
        return false;
      } else {
        // Create new shop and user if needed
        let userId = data.userId;

        // For new shops without a user ID, we'd typically create a shop owner user
        // This is simplified for the admin interface
        if (!userId) {
          console.log("Normalmente verrebbe creato un nuovo utente proprietario del negozio");
          
          // Temporary: we don't create a new user in the admin interface
          const tempUser = {
            name: `${data.name} Owner`,
            email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            role: 'shop',
            isActive: true,
          };
          
          console.log("User data would be:", tempUser);
        }

        // Create shop with available data
        const newShop: Shop = {
          id: `shop-${Date.now()}`,
          userId: data.userId || `user-${Date.now()}`,
          name: data.name,
          description: data.description || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          category: data.category || "",
          fiscalCode: data.fiscalCode || "",
          vatNumber: data.vatNumber || "",
          isActive: data.isActive || true,
          isApproved: data.isApproved || false,
          products: [],
          offers: [],
          aiCredits: 100,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          location: data.latitude && data.longitude ? {
            latitude: data.latitude,
            longitude: data.longitude
          } : null
        };

        const created = await createShop(newShop);
        
        // Add location if available
        if (created && created.id && created.location) {
          await saveShopLocation(created.id, created.location);
        }

        if (created) {
          toast.success("Negozio creato con successo");
          form.reset();
          if (onSuccess) onSuccess();
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error("Error submitting shop:", error);
      toast.error("Si è verificato un errore durante il salvataggio del negozio");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    location,
    setLocation
  };
};
