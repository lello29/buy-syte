
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DatabaseAdapter } from '@/lib/databaseAdapter';

// Since we're not actually using Next.js, we'll create a mock API function
// that we'll instead call from the frontend directly
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

// Since we're not using Next.js, this is a mock implementation
// that we don't actually need to export
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await deleteAllDemoData();
  
  if (result.success) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ error: result.error });
  }
}
