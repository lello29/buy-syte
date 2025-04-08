
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Migrates mock shop data to the database
 * @returns A Promise with the migrated shops array
 */
export const migrateShops = async (): Promise<Shop[]> => {
  try {
    if (shopBaseService.ensureSupabaseConfigured()) {
      try {
        // Check if shops table exists
        try {
          const { error: tablesError } = await supabase.rpc('get_tables');
          if (tablesError && tablesError.message.includes('does not exist')) {
            // Create the shops table if it doesn't exist
            const { error: createTableError } = await supabase.from('_schema').insert({
              name: 'shops',
              definition: `
                CREATE TABLE IF NOT EXISTS public.shops (
                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                  user_id UUID,
                  name TEXT NOT NULL,
                  description TEXT,
                  address TEXT,
                  phone TEXT,
                  email TEXT,
                  logo_image TEXT,
                  banner_image TEXT,
                  fiscal_code TEXT,
                  vat_number TEXT,
                  category TEXT,
                  latitude DOUBLE PRECISION,
                  longitude DOUBLE PRECISION,
                  is_active BOOLEAN DEFAULT true,
                  is_approved BOOLEAN DEFAULT false,
                  ai_credits INTEGER DEFAULT 100,
                  created_at TIMESTAMPTZ DEFAULT NOW(),
                  last_updated TIMESTAMPTZ DEFAULT NOW()
                );
              `
            });
            
            if (createTableError) {
              console.error("Error creating shops table:", createTableError);
            }
          }
        } catch (error) {
          console.error("Error checking if table exists:", error);
        }
        
        // Transform mock data to match the database schema
        const shopRecords = mockShops.map(shop => ({
          id: shop.id,
          user_id: shop.userId,
          name: shop.name,
          description: shop.description,
          address: shop.address,
          phone: shop.phone,
          email: shop.email,
          logo_image: shop.logoImage,
          banner_image: shop.bannerImage,
          fiscal_code: shop.fiscalCode,
          vat_number: shop.vatNumber,
          category: shop.category,
          latitude: shop.location?.latitude,
          longitude: shop.location?.longitude,
          is_active: true,
          is_approved: shop.isApproved !== undefined ? shop.isApproved : false,
          ai_credits: shop.aiCredits || 100,
          created_at: shop.createdAt,
          last_updated: new Date().toISOString()
        }));
        
        // Insert shop records
        const { error } = await supabase
          .from('shops')
          .upsert(shopRecords, { 
            onConflict: 'id',
            ignoreDuplicates: false
          });
        
        if (error) {
          console.error("Error migrating shops:", error);
          toast.error("Errore durante la migrazione dei negozi: " + error.message);
          // If migration failed, return mock shops anyway so UI isn't empty
          return mockShops;
        }
        
        // Return the migrated shops
        toast.success("Migrazione completata con successo");
        return mockShops;
      } catch (error) {
        console.error("Supabase migration error:", error);
        toast.error("Errore durante la migrazione");
        return mockShops;
      }
    }
    
    // If Supabase is not configured, just return the mock data
    console.log("Supabase non configurato, utilizzando dati mock");
    return mockShops;
  } catch (error) {
    console.error("Migration exception:", error);
    toast.error("Si è verificato un errore durante la migrazione");
    return mockShops;
  }
};
