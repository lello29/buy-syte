
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Importa un array di negozi nel database
 * @param shops Array di oggetti Shop da importare
 * @returns Promessa che si risolve quando l'importazione è completata
 */
export const importShops = async (shops: Partial<Shop>[]): Promise<boolean> => {
  try {
    if (!shops || shops.length === 0) {
      toast.error("Nessun negozio da importare");
      return false;
    }
    
    // Trasforma gli oggetti Shop nel formato atteso da Supabase
    const transformedShops = shops.map(shop => ({
      id: shop.id,
      user_id: shop.userId,
      name: shop.name,
      description: shop.description,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      logo_image: shop.logoImage,
      banner_image: shop.bannerImage,
      category: shop.category || 'General',
      ai_credits: shop.aiCredits || 100,
      is_approved: shop.isApproved === undefined ? true : shop.isApproved,
      last_updated: shop.lastUpdated || new Date().toISOString(),
      created_at: shop.createdAt || new Date().toISOString(),
      fiscal_code: shop.fiscalCode,
      vat_number: shop.vatNumber,
      latitude: shop.location?.latitude,
      longitude: shop.location?.longitude
    }));
    
    // Inserisci i negozi
    const { error } = await supabase
      .from('shops')
      .upsert(transformedShops, { 
        onConflict: 'id',
        ignoreDuplicates: false
      });
      
    if (error) {
      console.error("Errore durante l'importazione dei negozi:", error.message);
      toast.error("Errore durante l'importazione dei negozi");
      return false;
    }
    
    toast.success(`${shops.length} negozi importati con successo!`);
    return true;
  } catch (error) {
    console.error("Errore durante l'importazione dei negozi:", error);
    toast.error("Si è verificato un errore durante l'importazione dei negozi");
    return false;
  }
};

/**
 * Converte un array di oggetti in formato Excel nel formato Shop
 * @param excelData Array di oggetti dal file Excel
 * @returns Array di oggetti Shop
 */
export const convertExcelToShops = (excelData: any[]): Partial<Shop>[] => {
  if (!excelData || excelData.length === 0) {
    return [];
  }
  
  return excelData.map(row => {
    // Genera un ID casuale se non specificato
    const shopId = row.id || `shop-${Date.now()}-${Math.round(Math.random() * 1000)}`;
    
    return {
      id: shopId,
      userId: row.user_id || row.userId || null,
      name: row.name || 'Negozio senza nome',
      description: row.description || '',
      address: row.address || '',
      phone: row.phone || '',
      email: row.email || '',
      fiscalCode: row.fiscal_code || row.fiscalCode || '',
      vatNumber: row.vat_number || row.vatNumber || '',
      category: row.category || 'General',
      isActive: true,
      isApproved: row.is_approved === undefined ? true : row.is_approved,
      aiCredits: row.ai_credits || row.aiCredits || 100,
      createdAt: row.created_at || row.createdAt || new Date().toISOString(),
      lastUpdated: row.last_updated || row.lastUpdated || new Date().toISOString(),
      location: (row.latitude && row.longitude) 
        ? { latitude: parseFloat(row.latitude), longitude: parseFloat(row.longitude) } 
        : null,
      products: [],
      offers: []
    };
  });
};
