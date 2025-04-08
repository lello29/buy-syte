
import { supabase, verifyRequiredTables } from '@/lib/supabase';
import { 
  users, 
  shops, 
  products, 
  categories, 
  orders, 
  offers, 
  collaborators, 
  tasks 
} from '@/data/mockData';
import { toast } from 'sonner';

// Funzione per trasformare le chiavi da camelCase a snake_case
const toSnakeCase = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  
  Object.keys(obj).forEach(key => {
    // Trasforma la chiave da camelCase a snake_case
    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    
    // Se il valore è un oggetto e non è un array, applica ricorsivamente la funzione
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      result[snakeKey] = toSnakeCase(obj[key]);
    } else {
      result[snakeKey] = obj[key];
    }
  });
  
  return result;
};

// Inizializza tutte le tabelle e migra i dati
export const migrateAllData = async () => {
  try {
    console.log("Inizio migrazione dati...");
    toast.info("Inizio migrazione dati nel database...");
    
    // Verifica che tutte le tabelle richieste esistano
    const { allTablesExist, missingTables } = await verifyRequiredTables();
    
    if (!allTablesExist) {
      const missingTablesList = missingTables.join(', ');
      const errorMessage = `Migrazione fallita: tabelle mancanti nel database (${missingTablesList})`;
      console.error(errorMessage);
      toast.error(errorMessage);
      return false;
    }
    
    // Aggiungiamo l'utente admin specifico richiesto
    const adminUser = {
      id: `admin-${Date.now()}`,
      name: "Admin User",
      email: "service.online.italy@gmail.com",
      role: "admin",
      favorites: [],
      loyaltyPoints: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Aggiungiamo l'admin agli utenti mock se non esiste già
    if (!users.some(user => user.email === adminUser.email)) {
      users.unshift(adminUser);
    }
    
    // Mappatura delle entità e relative tabelle
    const migrations = [
      { data: users, table: 'users', transform: transformUsers },
      { data: categories, table: 'categories', transform: transformCategories },
      { data: shops, table: 'shops', transform: transformShops },
      { data: products, table: 'products', transform: transformProducts },
      { data: offers, table: 'offers', transform: transformOffers },
      { data: collaborators, table: 'collaborators', transform: transformCollaborators },
      { data: tasks, table: 'tasks', transform: transformTasks },
      { data: orders, table: 'orders', transform: transformOrders }
    ];
    
    // Esegui la migrazione per ogni entità
    for (const migration of migrations) {
      const result = await migrateTable(
        migration.table,
        migration.data,
        migration.transform
      );
      console.log(`Migrazione tabella ${migration.table}: ${result ? 'Completata' : 'Fallita'}`);
    }
    
    toast.success("Migrazione dati completata con successo!");
    console.log("Migrazione completata con successo!");
    return true;
  } catch (error) {
    console.error("Errore durante la migrazione dei dati:", error);
    toast.error("Errore durante la migrazione dei dati");
    return false;
  }
};

// Funzione generica per migrare una tabella
const migrateTable = async (
  tableName: string, 
  data: any[], 
  transform: (item: any) => any
) => {
  try {
    // Trasforma i dati secondo lo schema di Supabase
    const transformedData = data.map(item => transform(item));
    
    // Inserisci i dati nella tabella
    const { error } = await supabase
      .from(tableName)
      .upsert(transformedData, { 
        onConflict: 'id',
        ignoreDuplicates: false
      });
    
    if (error) {
      console.error(`Errore durante l'inserimento in ${tableName}:`, error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Errore durante la migrazione della tabella ${tableName}:`, error);
    return false;
  }
};

// Funzioni di trasformazione specifiche per ciascuna entità
const transformUsers = (user: any) => {
  const snakeCaseUser = toSnakeCase(user);
  return {
    ...snakeCaseUser,
    // Gestione specifica per utenti
  };
};

const transformShops = (shop: any) => {
  const snakeCaseShop = toSnakeCase(shop);
  
  // Estrazione latitudine e longitudine se esiste location
  let latitude = undefined;
  let longitude = undefined;
  
  if (shop.location) {
    latitude = shop.location.latitude;
    longitude = shop.location.longitude;
  }
  
  return {
    ...snakeCaseShop,
    latitude,
    longitude,
    category: shop.category || 'Altro',
    social_links: shop.socialLinks || null
  };
};

const transformProducts = (product: any) => {
  const snakeCaseProduct = toSnakeCase(product);
  return {
    ...snakeCaseProduct
  };
};

const transformOffers = (offer: any) => {
  const snakeCaseOffer = toSnakeCase(offer);
  return {
    ...snakeCaseOffer
  };
};

const transformCollaborators = (collaborator: any) => {
  const snakeCaseCollaborator = toSnakeCase(collaborator);
  return {
    ...snakeCaseCollaborator
  };
};

const transformTasks = (task: any) => {
  const snakeCaseTask = toSnakeCase(task);
  return {
    ...snakeCaseTask
  };
};

const transformOrders = (order: any) => {
  const snakeCaseOrder = toSnakeCase(order);
  return {
    ...snakeCaseOrder,
    products: order.products // Assicurati che products sia in formato JSON
  };
};

const transformCategories = (category: any) => {
  const snakeCaseCategory = toSnakeCase(category);
  return {
    ...snakeCaseCategory
  };
};
