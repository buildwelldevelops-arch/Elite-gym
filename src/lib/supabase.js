import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Resilient client: connects if credentials exist, or provides safe fallbacks
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: (tableName) => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: (data) => {
          try {
            const existing = JSON.parse(localStorage.getItem(`backend_${tableName}`) || '[]');
            localStorage.setItem(`backend_${tableName}`, JSON.stringify([...existing, ...data]));
          } catch (e) {}
          return Promise.resolve({ data, error: null });
        },
        upsert: (data) => Promise.resolve({ data, error: null }),
        update: () => Promise.resolve({ data: [], error: null }),
        delete: () => Promise.resolve({ data: [], error: null }),
      })
    };
