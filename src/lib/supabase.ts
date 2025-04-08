
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Use the pre-configured Lovable Supabase client
export const supabase = supabaseClient;

// Check if Supabase is configured (always true for Lovable integrated Supabase)
export const isSupabaseConfigured = true;

// List of required tables for the app
export const requiredTables = [
  'users',
  'shops',
  'products',
  'categories',
  'orders',
  'offers',
  'collaborators',
  'tasks'
];

// Function to verify required tables exist
export const verifyRequiredTables = async (): Promise<{
  allTablesExist: boolean;
  missingTables: string[];
}> => {
  try {
    console.log("Verifying required tables...");
    
    // Try to get tables using the get_tables function (may not exist yet)
    try {
      const { data: tablesData, error } = await supabase.rpc('get_tables');
      
      if (!error && tablesData) {
        console.log("Tables data:", tablesData);
        const tableNames = tablesData.map(table => table.table_name);
        const missingTables = requiredTables.filter(
          tableName => !tableNames.includes(tableName)
        );
        
        return {
          allTablesExist: missingTables.length === 0,
          missingTables
        };
      }
    } catch (e) {
      console.log("Error with RPC get_tables, trying alternative method");
    }
    
    // Alternative approach - check each table individually
    const missingTables = [];
    const existingTables = [];
    
    for (const tableName of requiredTables) {
      try {
        const { error } = await supabase
          .from(tableName)
          .select('count')
          .limit(1);
        
        if (error && (error.message.includes('does not exist') || error.code === '42P01')) {
          missingTables.push(tableName);
        } else {
          existingTables.push(tableName);
        }
      } catch (e) {
        // If we can't check, assume it's missing
        missingTables.push(tableName);
      }
    }
    
    console.log("Existing tables:", existingTables);
    console.log("Missing tables:", missingTables);
    
    return {
      allTablesExist: missingTables.length === 0,
      missingTables
    };
  } catch (error) {
    console.error('Error verifying tables:', error);
    return {
      allTablesExist: false,
      missingTables: requiredTables
    };
  }
};

// Create a helper function to run SQL
export const runSql = async (sql: string): Promise<boolean> => {
  try {
    await supabase.rpc('run_sql', { sql });
    return true;
  } catch (error) {
    console.error('Error running SQL:', error);
    return false;
  }
};
