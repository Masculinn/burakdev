import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export default function clientService() {
  if (!URL || !KEY) throw new Error("Missing API keys");

  return createClient(URL, KEY, {
    auth: { persistSession: false },
  });
}
