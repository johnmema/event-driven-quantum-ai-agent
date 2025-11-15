"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const MISSING_ENV_MESSAGE =
  "Supabase URL or anon key is missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.";

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn(MISSING_ENV_MESSAGE);
    return null;
  }

  return createBrowserClient<Database>(url, anonKey);
}
