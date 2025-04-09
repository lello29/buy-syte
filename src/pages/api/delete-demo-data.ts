
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DatabaseAdapter } from '@/lib/databaseAdapter';

/**
 * Function to delete all demo data from the database
 * @returns Result object with success status and error message if applicable
 */
export async function deleteAllDemoData() {
  try {
    if (!isSupabaseConfigured) {
      return { 
        success: false, 
        error: "Supabase non configurato correttamente" 
      };
    }

    // Delete data from all tables except for admin users
    const deletionResults = await Promise.all([
      DatabaseAdapter.deleteAll('users', 'role', 'admin'),
      DatabaseAdapter.deleteAll('shops'),
      DatabaseAdapter.deleteAll('products'),
      DatabaseAdapter.deleteAll('orders'),
      DatabaseAdapter.deleteAll('offers'),
      DatabaseAdapter.deleteAll('collaborators'),
      DatabaseAdapter.deleteAll('tasks'),
      DatabaseAdapter.deleteAll('categories')
    ]);

    // Check if all deletions were successful
    const allSuccessful = deletionResults.every(result => result === true);

    return { 
      success: allSuccessful,
      error: allSuccessful ? null : "Alcuni dati non sono stati eliminati correttamente"
    };
  } catch (error) {
    console.error("Error deleting demo data:", error);
    return { 
      success: false, 
      error: "Si è verificato un errore durante l'eliminazione dei dati demo" 
    };
  }
}

// Function to handle direct API calls (for non-Next.js usage)
export function handleDeleteDemoData() {
  return deleteAllDemoData();
}
