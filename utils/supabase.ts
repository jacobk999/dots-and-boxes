import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);
