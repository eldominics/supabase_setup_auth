import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ygmzgsqgknapfcnpnccj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnbXpnc3Fna25hcGZjbnBuY2NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDA0MzYsImV4cCI6MjA1NTg3NjQzNn0.0WibY9O36iXLUdwyOUUOTZlyZDa3oy2n762ji-hMZMg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
