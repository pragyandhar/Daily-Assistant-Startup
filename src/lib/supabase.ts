import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,      // Re-enable auto-refresh for better sessions
    persistSession: true,       // Re-enable session persistence
    detectSessionInUrl: true    // Keep detecting auth callbacks
  }
})

// Database types (you can generate these from Supabase CLI later)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
          plan: string
          prompts_remaining: number
          total_prompts: number
          images_remaining: number
          total_images: number
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          plan?: string
          prompts_remaining?: number
          total_prompts?: number
          images_remaining?: number
          total_images?: number
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
          plan?: string
          prompts_remaining?: number
          total_prompts?: number
          images_remaining?: number
          total_images?: number
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          messages: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
