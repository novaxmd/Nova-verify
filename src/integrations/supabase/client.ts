import { createClient } from '@supabase/supabase-js';

// These come from your .env file (see .env.example).
// VITE_ prefix is required by Vite to expose them to the browser.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Supabase] VITE_SUPABASE_URL au VITE_SUPABASE_ANON_KEY haziko kwenye .env. ' +
      'Login (Email OTP / Google / GitHub) haitafanya kazi mpaka uziweke. Angalia .env.example'
  );
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
