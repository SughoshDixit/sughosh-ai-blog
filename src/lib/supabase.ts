
import { createClient } from '@supabase/supabase-js';

// Check if environment variables are available
const hasEnvVars = 
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are missing
const createMockClient = () => {
  console.warn('Missing Supabase environment variables. Auth features are disabled.');
  
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

// Create the actual client only if we have environment variables, otherwise use mock
export const supabase = hasEnvVars 
  ? createClient(
      import.meta.env.VITE_SUPABASE_URL, 
      import.meta.env.VITE_SUPABASE_ANON_KEY
    )
  : createMockClient() as any; // Type cast to avoid TypeScript errors
