// 'use server';

// import { createClient } from "@supabase/supabase-js";
// import type { SupabaseClient } from "@supabase/supabase-js";

// import type { Database } from "@/types/database";

// const MISSING_ENV_MESSAGE =
//   "Supabase service role key or URL is missing. Add SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL to your environment.";

// export function getSupabaseServiceRoleClient(): SupabaseClient<Database> | null {
//   const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

//   if (!url || !serviceRoleKey) {
//     console.warn(MISSING_ENV_MESSAGE);
//     return null;
//   }

//   return createClient<Database>(url, serviceRoleKey, {
//     auth: {
//       autoRefreshToken: false,
//       persistSession: false,
//     },
//   });
// }
