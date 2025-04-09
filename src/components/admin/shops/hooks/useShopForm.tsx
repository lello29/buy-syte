
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Shop, User, UserRole } from "@/types";
import { createShop, updateShop } from "@/services/shop";
import { saveShopLocation } from "@/data/shop-utils/shop-location";

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

export type ShopFormData = z.infer<typeof shopSchema>;

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
      latitude: shop.location?.latitude,
      longitude: shop.location?.longitude,
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
        
        const updated = await updateShop(updatedShop);
        
        if (updated) {
          toast.success("Negozio aggiornato con successo");
          if (onSuccess) onSuccess();
        }
      } else {
        // Create new shop and user if needed
        let userId = data.userId;

        // For new shops without a user ID, we'd typically create a shop owner user
        // This is simplified for the admin interface
        if (!userId) {
          // In a real implementation, we would create a new user here
          // and use its ID. For now, we're setting a placeholder message.
          console.log("Normalmente verrebbe creato un nuovo utente proprietario del negozio");
          
          // Temporary: we don't create a new user in the admin interface
          // The actual user creation would happen elsewhere
          const tempUser: Partial<User> = {
            name: `${data.name} Owner`,
            email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            role: 'shop' as UserRole,
            // Don't include password here as it's not in the User type
            isActive: true,
          };
          
          console.log("User data would be:", tempUser);
        }

        // Create shop with available data
        const newShop: Shop = {
          id: `shop-${Date.now()}`,
          name: data.name,
          description: data.description || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          category: data.category || "",
          fiscalCode: data.fiscalCode || "",
          vatNumber: data.vatNumber || "",
          userId: userId || `user-${Date.now()}`,
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

        // Add location if available
        if (data.latitude && data.longitude && newShop.id) {
          if (newShop.location) {
            // Pass both shop ID and location to saveShopLocation
            await saveShopLocation(newShop.id, newShop.location);
          }
        }

        const created = await createShop(newShop);
        if (created) {
          toast.success("Negozio creato con successo");
          form.reset();
          if (onSuccess) onSuccess();
        }
      }
    } catch (error) {
      console.error("Error submitting shop:", error);
      toast.error("Si è verificato un errore durante il salvataggio del negozio");
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
