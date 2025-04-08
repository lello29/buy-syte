
import { supabase } from "@/lib/supabase";
import { Shop } from "@/types";
import { shops as mockShops } from "@/data/mock-data/shops-data";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";

/**
 * Migrates shop data from mock data to the database
 * @returns Migrated shops array
 */
export const migrateShops = async (): Promise<Shop[]> => {
  try {
    console.log("Starting shop migration process");
    
    // Check if Supabase is properly configured
    if (!shopBaseService.ensureSupabaseConfigured()) {
      console.warn("Supabase not configured, returning mock data without migration");
      toast.warning("Configurazione Supabase non trovata. Usa i dati di esempio");
      return mockShops;
    }
    
    // First check if the shops table exists
    try {
      const { count, error: countError } = await supabase
        .from('shops')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        if (countError.message.includes("does not exist") || countError.code === '42P01') {
          console.log("Shops table doesn't exist. Creating table...");
          await createShopsTable();
        } else {
          console.error("Error checking shops table:", countError);
          throw countError;
        }
      } else {
        console.log(`Found existing shops table with count: ${count}`);
        
        // If shops table exists but is empty, proceed with migration
        if (count === 0) {
          console.log("Shops table is empty, migrating mock data...");
        } else {
          console.log("Shops table already has data. Skipping migration.");
          
          // Fetch existing shops
          const { data: existingShops, error: fetchError } = await supabase
            .from('shops')
            .select('*');
            
          if (fetchError) {
            console.error("Error fetching existing shops:", fetchError);
            throw fetchError;
          }
          
          // Transform to app format and return
          return existingShops.map(shop => shopBaseService.transformShopFromDB(shop));
        }
      }
    } catch (error) {
      console.error("Error checking or creating shops table:", error);
      // If we can't check or create the table, fall back to mock data
      toast.error("Errore durante la verifica o creazione della tabella dei negozi");
      return mockShops;
    }
    
    // Prepare shops for insertion by transforming to DB format
    const shopsToInsert = mockShops.map(shop => ({
      id: shop.id,
      user_id: shop.userId || null,
      name: shop.name,
      description: shop.description || null,
      address: shop.address || null,
      phone: shop.phone || null,
      email: shop.email || null,
      fiscal_code: shop.fiscalCode || null,
      vat_number: shop.vatNumber || null,
      category: shop.category || null,
      logo_image: shop.logoImage || null,
      banner_image: shop.bannerImage || null,
      is_active: shop.isActive !== undefined ? shop.isActive : true,
      is_approved: shop.isApproved !== undefined ? shop.isApproved : false,
      ai_credits: shop.aiCredits || 100,
      created_at: shop.createdAt || new Date().toISOString(),
      last_updated: shop.lastUpdated || shop.createdAt || new Date().toISOString(),
      latitude: shop.location ? shop.location.latitude : null,
      longitude: shop.location ? shop.location.longitude : null
    }));
    
    console.log(`Inserting ${shopsToInsert.length} shops into database...`);
    
    // Insert all shops
    const { data: insertedShops, error: insertError } = await supabase
      .from('shops')
      .insert(shopsToInsert)
      .select();
      
    if (insertError) {
      console.error("Error inserting shops:", insertError);
      toast.error("Errore durante l'inserimento dei negozi nel database");
      return mockShops;
    }
    
    console.log(`Successfully inserted ${insertedShops.length} shops`);
    toast.success(`${insertedShops.length} negozi migrati con successo!`);
    
    // Transform inserted shops to app format
    return insertedShops.map(shop => shopBaseService.transformShopFromDB(shop));
  } catch (error) {
    console.error("Error migrating shops:", error);
    toast.error("Si è verificato un errore durante la migrazione dei negozi");
    return mockShops;
  }
};

/**
 * Create the shops table if it doesn't exist
 */
const createShopsTable = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.rpc('run_sql', { 
      sql: `
        CREATE TABLE IF NOT EXISTS shops (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID,
          name TEXT NOT NULL,
          description TEXT,
          address TEXT,
          phone TEXT,
          email TEXT,
          fiscal_code TEXT,
          vat_number TEXT,
          category TEXT,
          logo_image TEXT,
          banner_image TEXT,
          is_active BOOLEAN DEFAULT true,
          is_approved BOOLEAN DEFAULT false,
          ai_credits INTEGER DEFAULT 100,
          created_at TIMESTAMPTZ DEFAULT now(),
          last_updated TIMESTAMPTZ DEFAULT now(),
          latitude DOUBLE PRECISION,
          longitude DOUBLE PRECISION,
          about_us TEXT,
          website_url TEXT,
          opening_hours TEXT
        );
      `
    });
    
    if (error) {
      console.error("Error creating shops table:", error);
      throw error;
    }
    
    console.log("Successfully created shops table");
    return true;
  } catch (error) {
    console.error("Error in createShopsTable:", error);
    return false;
  }
};
