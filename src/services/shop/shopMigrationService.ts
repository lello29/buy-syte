
import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { shopBaseService } from "./shopBaseService";
import { shops as mockShops } from "@/data/shop-utils/shop-query";
import { users } from "@/data/users";

/**
 * Service for migrating shop data
 */
export const migrateShops = async (): Promise<Shop[]> => {
  try {
    // Verifica se la tabella users esiste e contiene dati
    let usersData = [];
    const { data: existingUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, role')
      .in('role', ['user', 'shop', 'admin']);
      
    if (usersError) {
      console.error("Errore nel recupero degli utenti:", usersError.message);
      toast.error("Impossibile recuperare gli utenti dal database");
      // Continuiamo comunque per utilizzare gli utenti mock
    } else {
      usersData = existingUsers || [];
    }
    
    // Se non ci sono utenti nel database, utilizza i dati mock
    if (usersData.length === 0) {
      console.log("Nessun utente trovato nel database, utilizzo dati mock");
      
      // Inserisci gli utenti mock nel database
      for (const user of users) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            favorites: user.favorites,
            loyalty_points: user.loyaltyPoints,
            is_active: user.isActive,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
            fiscal_code: user.fiscalCode,
            vat_number: user.vatNumber
          });
          
        if (insertError) {
          console.error(`Errore nell'inserimento dell'utente ${user.name}:`, insertError.message);
        } else {
          console.log(`Utente ${user.name} inserito con successo`);
        }
      }
      
      // Recupera gli utenti appena inseriti
      const { data: insertedUsers, error: fetchError } = await supabase
        .from('users')
        .select('id, email, role')
        .in('role', ['user', 'shop', 'admin']);
        
      if (fetchError) {
        console.error("Errore nel recupero degli utenti dopo l'inserimento:", fetchError.message);
      } else {
        usersData = insertedUsers || [];
      }
    }
    
    console.log("Utenti disponibili per associazione ai negozi:", usersData);
    
    // Funzione per trovare un utente adatto a cui associare un negozio
    const findUserIdForShop = (shop: Shop, users: any[]): string => {
      // Prima, cerca un utente con la stessa email del negozio
      const userWithMatchingEmail = users.find(u => u.email === shop.email);
      if (userWithMatchingEmail) return userWithMatchingEmail.id;
      
      // Se non c'è corrispondenza email, cerca un utente con ruolo 'shop'
      const shopUser = users.find(u => u.role === 'shop');
      if (shopUser) return shopUser.id;
      
      // Altrimenti, utilizza un utente qualsiasi
      return users.length > 0 ? users[0].id : '';
    };
    
    // Inserimento dei negozi nel database
    const migratedShops: Shop[] = [];
    
    for (const shop of mockShops) {
      // Trova un userId appropriato
      const userId = findUserIdForShop(shop, usersData);
      
      const { data, error } = await supabase
        .from('shops')
        .insert({
          name: shop.name,
          description: shop.description,
          address: shop.address,
          phone: shop.phone,
          email: shop.email,
          category: shop.category || 'Generale',
          fiscal_code: shop.fiscalCode,
          vat_number: shop.vatNumber,
          is_active: shop.isActive !== undefined ? shop.isActive : true,
          is_approved: shop.isApproved !== undefined ? shop.isApproved : true,
          ai_credits: shop.aiCredits || 100,
          created_at: shop.createdAt,
          last_updated: shop.lastUpdated || new Date().toISOString(),
          latitude: shop.location?.latitude,
          longitude: shop.location?.longitude,
          user_id: userId // Assegna un userId al negozio
        })
        .select();
        
      if (error) {
        console.error(`Errore durante la migrazione del negozio ${shop.name}:`, error.message);
        toast.error(`Errore durante la migrazione del negozio ${shop.name}`);
      } else if (data && data.length > 0) {
        // Trasforma il risultato Supabase in un oggetto Shop
        const migratedShop: Shop = {
          id: data[0].id,
          userId: data[0].user_id || '', // Mantieni l'associazione con l'utente
          name: data[0].name,
          description: data[0].description,
          address: data[0].address,
          phone: data[0].phone,
          email: data[0].email,
          category: data[0].category,
          fiscalCode: data[0].fiscal_code,
          vatNumber: data[0].vat_number,
          isActive: data[0].is_active,
          isApproved: data[0].is_approved,
          aiCredits: data[0].ai_credits,
          createdAt: data[0].created_at,
          lastUpdated: data[0].last_updated,
          location: data[0].latitude && data[0].longitude 
            ? { latitude: data[0].latitude, longitude: data[0].longitude } 
            : null,
          products: [],
          offers: []
        };
        
        migratedShops.push(migratedShop);
        console.log(`Negozio ${shop.name} migrato con successo e associato all'utente ${userId}`);
      }
    }
    
    toast.success(`${migratedShops.length} negozi migrati con successo!`);
    return migratedShops;
  } catch (error) {
    console.error("Errore durante la migrazione dei negozi:", error);
    toast.error("Si è verificato un errore durante la migrazione dei negozi");
    return [];
  }
};
