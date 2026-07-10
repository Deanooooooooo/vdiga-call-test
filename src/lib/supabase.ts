import { createClient } from "@supabase/supabase-js";

const fallbackSupabaseUrl = "https://sfojhtufeygcywykxvab.supabase.co";
const fallbackSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmb2podHVmZXlnY3l3eWt4dmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDg2ODcsImV4cCI6MjA5OTEyNDY4N30.8WwCIMnTzUexxJkAVId7hFPl28xh4EK7-VXyGWyjSvc";
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
