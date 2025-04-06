
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if credentials are missing
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabaseClient;

if (isSupabaseConfigured) {
  // Only create the client if we have valid credentials
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  console.error('Supabase URL o chiave anonima mancante. Verifica le variabili d\'ambiente.');
  // Create a mock client that won't perform actual operations
  supabaseClient = {
    from: () => ({
      upsert: () => ({ error: new Error('Supabase not configured') }),
      select: () => ({ error: new Error('Supabase not configured') }),
    }),
    // Add other methods we might need to mock
  } as any;
}

export const supabase = supabaseClient;
