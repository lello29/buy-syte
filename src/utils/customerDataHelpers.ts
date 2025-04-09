
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Customer } from '@/pages/dashboard/shop/customers/types';
import { mockCustomers } from '@/pages/dashboard/shop/customers/data/mockCustomers';
import { toast } from 'sonner';

/**
 * Creates the customers table in Supabase if it doesn't exist
 */
export const createCustomersTable = async (): Promise<boolean> => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase not configured, cannot create customers table");
    return false;
  }
  
  try {
    const { error } = await supabase.rpc('run_sql', { 
      sql: `
        CREATE TABLE IF NOT EXISTS customers (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          points INTEGER DEFAULT 0,
          orders INTEGER DEFAULT 0,
          last_purchase DATE,
          notes TEXT,
          address TEXT,
          order_count INTEGER DEFAULT 0,
          total_spent DECIMAL(10,2) DEFAULT 0,
          last_order_date DATE,
          shop_id UUID,
          created_at TIMESTAMPTZ DEFAULT now(),
          updated_at TIMESTAMPTZ DEFAULT now()
        );
      `
    });
    
    if (error) {
      console.error("Error creating customers table:", error);
      toast.error("Errore durante la creazione della tabella clienti");
      return false;
    }
    
    console.log("Successfully created customers table or it already exists");
    return true;
  } catch (error) {
    console.error("Error in createCustomersTable:", error);
    toast.error("Si è verificato un errore durante la creazione della tabella clienti");
    return false;
  }
};

/**
 * Migrates mock customer data to Supabase
 */
export const migrateCustomerData = async (): Promise<boolean> => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase not configured, cannot migrate customer data");
    toast.warning("Database non configurato, impossibile migrare i dati clienti");
    return false;
  }
  
  try {
    // First check if table exists, create it if not
    const tableCreated = await createCustomersTable();
    if (!tableCreated) return false;
    
    // Check if data already exists
    const { count, error: countError } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });
      
    if (countError) {
      console.error("Error checking customers count:", countError);
      toast.error("Errore durante la verifica dei dati clienti esistenti");
      return false;
    }
    
    // If data already exists, don't migrate
    if (count && count > 0) {
      console.log("Customer data already exists, skipping migration");
      toast.info("I dati clienti esistono già nel database");
      return true;
    }
    
    // Transform mock data to database format
    const customersToInsert = mockCustomers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone || null,
      points: customer.points || 0,
      orders: customer.orders || 0,
      last_purchase: customer.lastPurchase || null,
      notes: customer.notes || null,
      address: customer.address || null,
      order_count: customer.orderCount || 0,
      total_spent: customer.totalSpent || 0,
      last_order_date: customer.lastOrderDate || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    
    // Insert customers
    const { error: insertError } = await supabase
      .from('customers')
      .insert(customersToInsert);
      
    if (insertError) {
      console.error("Error inserting customers:", insertError);
      toast.error("Errore durante l'inserimento dei dati clienti");
      return false;
    }
    
    toast.success("Dati clienti migrati con successo!");
    return true;
  } catch (error) {
    console.error("Error in migrateCustomerData:", error);
    toast.error("Si è verificato un errore durante la migrazione dei dati clienti");
    return false;
  }
};

/**
 * Fetches customers from database with mock fallback
 */
export const fetchCustomers = async (): Promise<Customer[]> => {
  if (!isSupabaseConfigured) {
    console.warn("Supabase not configured, using mock customers");
    return mockCustomers;
  }
  
  try {
    // Check if table exists
    const { error: tableCheckError } = await supabase
      .from('customers')
      .select('count')
      .limit(1);
      
    if (tableCheckError && (tableCheckError.message.includes('does not exist') || tableCheckError.code === '42P01')) {
      console.warn("Customers table doesn't exist, using mock data");
      return mockCustomers;
    }
    
    // Fetch customers
    const { data, error } = await supabase
      .from('customers')
      .select('*');
      
    if (error) {
      console.error("Error fetching customers:", error);
      toast.error("Errore durante il recupero dei dati clienti");
      return mockCustomers;
    }
    
    // Transform column names from snake_case to camelCase
    const transformedData: Customer[] = data.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      points: customer.points,
      orders: customer.orders,
      lastPurchase: customer.last_purchase,
      notes: customer.notes,
      address: customer.address,
      orderCount: customer.order_count,
      totalSpent: customer.total_spent,
      lastOrderDate: customer.last_order_date
    }));
    
    return transformedData.length > 0 ? transformedData : mockCustomers;
  } catch (error) {
    console.error("Error in fetchCustomers:", error);
    return mockCustomers;
  }
};
