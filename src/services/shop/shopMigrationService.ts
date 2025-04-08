import { Shop } from "@/types";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { shops as mockShops } from "@/data/mock-data/shop-query";
import { users } from "@/data/users";

/**
 * Service for migrating shop data
 */
export const migrateShops = async (): Promise<Shop[]> => {
  try {
    // Verify admin account exists before proceeding
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('email', 'service.online.italy@gmail.com')
      .single();
      
    if (adminError || !adminUser) {
      console.error("Admin user not found:", adminError?.message);
      toast.error("Utente amministratore non trovato. Verifica l'account admin.");
      return [];
    }
    
    console.log("Admin user found:", adminUser);
    
    // First migrate demo users with correct roles
    await migrateUsers();
    
    // Then fetch all available users
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('id, email, role')
      .in('role', ['user', 'shop', 'admin']);
      
    if (usersError) {
      console.error("Errore nel recupero degli utenti:", usersError.message);
      toast.error("Impossibile recuperare gli utenti dal database");
      return [];
    }
    
    const availableUsers = usersData || [];
    console.log("Utenti disponibili per associazione ai negozi:", availableUsers);
    
    if (availableUsers.length === 0) {
      toast.error("Nessun utente disponibile. Impossibile procedere con la migrazione dei negozi.");
      return [];
    }
    
    // Function to find appropriate user to associate with a shop
    const findUserIdForShop = (shop: Shop, users: any[]): string => {
      // First look for a user with matching email
      const userWithMatchingEmail = users.find(u => u.email === shop.email);
      if (userWithMatchingEmail) return userWithMatchingEmail.id;
      
      // Then look for a shop-role user
      const shopUser = users.find(u => u.role === 'shop');
      if (shopUser) return shopUser.id;
      
      // Otherwise use the first available user (should be admin)
      return users[0].id;
    };
    
    // Insert shops into database
    const migratedShops: Shop[] = [];
    
    for (const shop of mockShops) {
      // Find appropriate userId
      const userId = findUserIdForShop(shop, availableUsers);
      
      const { data, error } = await supabase
        .from('shops')
        .insert({
          name: shop.name,
          description: shop.description || '',
          address: shop.address || '',
          phone: shop.phone || '',
          email: shop.email || '',
          category: shop.category || 'Generale',
          fiscal_code: shop.fiscalCode || '',
          vat_number: shop.vatNumber || '',
          is_active: shop.isActive !== undefined ? shop.isActive : true,
          is_approved: shop.isApproved !== undefined ? shop.isApproved : true,
          ai_credits: shop.aiCredits || 100,
          created_at: shop.createdAt || new Date().toISOString(),
          last_updated: shop.lastUpdated || new Date().toISOString(),
          latitude: shop.location?.latitude,
          longitude: shop.location?.longitude,
          user_id: userId,
          logo_image: shop.logoImage,
          banner_image: shop.bannerImage,
          website_url: shop.websiteUrl,
          opening_hours: shop.openingHours,
          about_us: shop.aboutUs
        })
        .select();
        
      if (error) {
        console.error(`Errore durante la migrazione del negozio ${shop.name}:`, error.message);
        toast.error(`Errore durante la migrazione del negozio ${shop.name}`);
      } else if (data && data.length > 0) {
        // Transform Supabase result to Shop object
        const migratedShop: Shop = {
          id: data[0].id,
          userId: data[0].user_id || '',
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
          offers: [],
          logoImage: data[0].logo_image,
          bannerImage: data[0].banner_image,
          websiteUrl: data[0].website_url,
          openingHours: data[0].opening_hours,
          aboutUs: data[0].about_us
        };
        
        migratedShops.push(migratedShop);
        console.log(`Negozio ${shop.name} migrato con successo e associato all'utente ${userId}`);
      }
    }
    
    // Migrate products for shops
    await migrateProducts(migratedShops);
    
    // Migrate offers for shops
    await migrateOffers(migratedShops);
    
    // Migrate tasks for shops
    await migrateTasks(migratedShops);
    
    toast.success(`${migratedShops.length} negozi migrati con successo!`);
    return migratedShops;
  } catch (error) {
    console.error("Errore durante la migrazione dei negozi:", error);
    toast.error("Si è verificato un errore durante la migrazione dei negozi");
    return [];
  }
};

/**
 * Helper function to migrate users
 */
const migrateUsers = async (): Promise<boolean> => {
  try {
    let successCount = 0;
    
    for (const user of users) {
      if (user.email === 'service.online.italy@gmail.com') {
        // Skip admin user, as it's already in the database
        continue;
      }
      
      const { error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          favorites: user.favorites || [],
          loyalty_points: user.loyaltyPoints || 0,
          is_active: user.isActive !== undefined ? user.isActive : true,
          created_at: user.createdAt || new Date().toISOString(),
          updated_at: user.updatedAt || new Date().toISOString(),
          fiscal_code: user.fiscalCode || null,
          vat_number: user.vatNumber || null
        });
        
      if (error) {
        if (error.code === '23505') { // Unique violation error
          console.log(`Utente ${user.name} già esistente, aggiornamento...`);
          // Try to update instead
          const { error: updateError } = await supabase
            .from('users')
            .update({
              name: user.name,
              role: user.role,
              favorites: user.favorites || [],
              loyalty_points: user.loyaltyPoints || 0,
              is_active: user.isActive !== undefined ? user.isActive : true,
              updated_at: user.updatedAt || new Date().toISOString(),
              fiscal_code: user.fiscalCode || null,
              vat_number: user.vatNumber || null
            })
            .eq('email', user.email);
            
          if (!updateError) {
            successCount++;
          } else {
            console.error(`Errore nell'aggiornamento dell'utente ${user.name}:`, updateError.message);
          }
        } else {
          console.error(`Errore nell'inserimento dell'utente ${user.name}:`, error.message);
        }
      } else {
        successCount++;
        console.log(`Utente ${user.name} inserito con successo`);
      }
    }
    
    if (successCount > 0) {
      toast.success(`${successCount} utenti migrati con successo!`);
      return true;
    } else {
      toast.warning("Nessun nuovo utente migrato");
      return false;
    }
  } catch (error) {
    console.error("Errore durante la migrazione degli utenti:", error);
    toast.error("Si è verificato un errore durante la migrazione degli utenti");
    return false;
  }
};

/**
 * Helper function to migrate products for shops
 */
const migrateProducts = async (shops: Shop[]): Promise<boolean> => {
  try {
    const { data: productsData } = await import('@/data/products');
    const products = productsData.products || [];
    
    if (products.length === 0) {
      console.log("Nessun prodotto da migrare");
      return true;
    }
    
    let successCount = 0;
    
    for (const product of products) {
      // Find the correct shop ID in the migrated shops
      const shop = shops.find(s => s.id === product.shopId);
      const shopId = shop ? shop.id : shops[0]?.id;
      
      if (!shopId) {
        console.error("Nessun negozio trovato per associare il prodotto");
        continue;
      }
      
      const { error } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description || '',
          price: product.price,
          discount_price: product.discountPrice,
          category: product.category,
          inventory: product.inventory,
          images: product.images,
          is_active: product.isActive,
          shop_id: shopId,
          created_at: product.createdAt,
          updated_at: product.updatedAt
        });
        
      if (error) {
        console.error(`Errore nell'inserimento del prodotto ${product.name}:`, error.message);
      } else {
        successCount++;
      }
    }
    
    if (successCount > 0) {
      console.log(`${successCount} prodotti migrati con successo!`);
      return true;
    } else {
      console.log("Nessun prodotto migrato");
      return false;
    }
  } catch (error) {
    console.error("Errore durante la migrazione dei prodotti:", error);
    return false;
  }
};

/**
 * Helper function to migrate offers for shops
 */
const migrateOffers = async (shops: Shop[]): Promise<boolean> => {
  try {
    const { offers } = await import('@/data/offers');
    
    if (offers.length === 0) {
      console.log("Nessuna offerta da migrare");
      return true;
    }
    
    let successCount = 0;
    
    for (const offer of offers) {
      // Find the correct shop ID in the migrated shops
      const shop = shops.find(s => s.id === offer.shopId);
      const shopId = shop ? shop.id : shops[0]?.id;
      
      if (!shopId) {
        console.error("Nessun negozio trovato per associare l'offerta");
        continue;
      }
      
      const { error } = await supabase
        .from('offers')
        .insert({
          title: offer.title || offer.name,
          description: offer.description || '',
          discount_percentage: offer.discountPercentage || offer.discount,
          start_date: offer.startDate,
          end_date: offer.endDate,
          is_active: offer.isActive,
          shop_id: shopId,
          created_at: new Date().toISOString()
        });
        
      if (error) {
        console.error(`Errore nell'inserimento dell'offerta ${offer.name}:`, error.message);
      } else {
        successCount++;
      }
    }
    
    if (successCount > 0) {
      console.log(`${successCount} offerte migrate con successo!`);
      return true;
    } else {
      console.log("Nessuna offerta migrata");
      return false;
    }
  } catch (error) {
    console.error("Errore durante la migrazione delle offerte:", error);
    return false;
  }
};

/**
 * Helper function to migrate tasks for shops
 */
const migrateTasks = async (shops: Shop[]): Promise<boolean> => {
  try {
    const { tasks } = await import('@/data/tasks');
    
    if (tasks.length === 0) {
      console.log("Nessun task da migrare");
      return true;
    }
    
    let successCount = 0;
    
    for (const task of tasks) {
      // Find the correct shop ID in the migrated shops
      const shop = shops.find(s => s.id === task.shopId);
      const shopId = shop ? shop.id : shops[0]?.id;
      
      if (!shopId) {
        console.error("Nessun negozio trovato per associare il task");
        continue;
      }
      
      const { error } = await supabase
        .from('tasks')
        .insert({
          title: task.title,
          description: task.description,
          status: task.status,
          reward: task.reward,
          due_date: task.dueDate,
          collaborator_id: task.collaboratorId,
          shop_id: shopId,
          created_at: task.createdAt,
          updated_at: task.updatedAt
        });
        
      if (error) {
        console.error(`Errore nell'inserimento del task ${task.title}:`, error.message);
      } else {
        successCount++;
      }
    }
    
    if (successCount > 0) {
      console.log(`${successCount} task migrati con successo!`);
      return true;
    } else {
      console.log("Nessun task migrato");
      return false;
    }
  } catch (error) {
    console.error("Errore durante la migrazione dei task:", error);
    return false;
  }
};
