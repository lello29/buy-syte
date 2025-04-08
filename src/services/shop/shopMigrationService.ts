
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
    if (!shopBaseService.ensureSupabaseConfigured()) {
      console.log("Supabase not configured, using mock data");
      return mockShops;
    }

    // First check if shops table exists
    const { data: tablesData, error: tablesError } = await supabase.rpc('get_tables');
    
    if (tablesError) {
      console.error("Error getting tables:", tablesError.message);
      
      // Try direct table check instead
      const { error: tableCheckError } = await supabase
        .from('shops')
        .select('count')
        .limit(1);
      
      // If table doesn't exist, create it
      if (tableCheckError && tableCheckError.message.includes('does not exist')) {
        console.log("Creating shops table...");
        try {
          const { error: createError } = await supabase.rpc('create_shops_table');
          if (createError) {
            console.error("Error creating shops table:", createError.message);
            toast.error("Errore nella creazione della tabella negozi");
            return mockShops;
          }
        } catch (e) {
          console.error("Exception creating table:", e);
          // Fallback: trying direct SQL (less ideal but might work)
          const createTableSQL = `
            CREATE TABLE IF NOT EXISTS shops (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              user_id UUID,
              name TEXT NOT NULL,
              description TEXT,
              address TEXT,
              phone TEXT,
              email TEXT,
              logo_image TEXT,
              banner_image TEXT,
              category TEXT,
              fiscal_code TEXT,
              vat_number TEXT,
              latitude DOUBLE PRECISION,
              longitude DOUBLE PRECISION,
              is_active BOOLEAN DEFAULT true,
              is_approved BOOLEAN DEFAULT false,
              ai_credits INTEGER DEFAULT 100,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              last_updated TIMESTAMPTZ DEFAULT NOW()
            );
          `;
          
          try {
            await supabase.rpc('run_sql', { sql: createTableSQL });
          } catch (sqlError) {
            console.error("SQL execution error:", sqlError);
          }
        }
      }
    }
    
    // Transform shop data for database format
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
      category: shop.category || 'General',
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
      return mockShops;
    }
    
    toast.success("Negozi migrati con successo!");
    return mockShops;
  } catch (error) {
    console.error("Migration exception:", error);
    toast.error("Si è verificato un errore durante la migrazione");
    return mockShops;
  }
};
