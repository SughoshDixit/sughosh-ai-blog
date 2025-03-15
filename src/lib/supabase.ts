
import { createClient } from '@supabase/supabase-js';

// Your Supabase credentials
const SUPABASE_URL = "https://txhepdgeeykkggnsmomq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4aGVwZGdlZXlra2dnbnNtb21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwNTkxMDIsImV4cCI6MjA1NzYzNTEwMn0.WYes42EudoIlV71Th0ZPaqqaAPN30qZg70VQFJ0suvA";

// Check if we have valid Supabase credentials
const hasValidCredentials = SUPABASE_URL && SUPABASE_ANON_KEY;

// Create a mock client if credentials are missing
const createMockClient = () => {
  console.warn('Missing Supabase credentials. Auth features are disabled.');
  
  // Return a mock client that doesn't actually connect to any URL
  return {
    auth: {
      signInWithOAuth: () => Promise.resolve({ error: new Error('Auth disabled: Missing Supabase configuration') }),
      signInWithPassword: () => Promise.resolve({ error: new Error('Auth disabled: Missing Supabase configuration') }),
      signOut: () => Promise.resolve({ error: null }),
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => Promise.resolve({ data: [], error: null }),
        }),
        order: () => Promise.resolve({ data: [], error: null }),
      }),
      insert: () => Promise.resolve({ error: new Error('Database disabled: Missing Supabase configuration') }),
      delete: () => Promise.resolve({ error: new Error('Database disabled: Missing Supabase configuration') }),
    }),
    functions: {
      invoke: () => Promise.resolve({ data: { response: "Auth disabled: Missing Supabase configuration" }, error: null }),
    },
  };
};

// Create the Supabase client with your credentials
export const supabase = hasValidCredentials 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : createMockClient() as any; // Type cast to avoid TypeScript errors
