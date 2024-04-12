import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_SUPABASE_URL: string;
			NEXT_PUBLIC_SUPABASE_KEY: string;
		}
	}
}
