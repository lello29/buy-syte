
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'user' | 'shop' | 'collaborator' | 'admin'
          favorites: string[]
          loyalty_points: number
          is_active: boolean
          created_at: string
          updated_at: string
          fiscal_code?: string
          vat_number?: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'user' | 'shop' | 'collaborator' | 'admin'
          favorites?: string[]
          loyalty_points?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
          fiscal_code?: string
          vat_number?: string
        }
        Update: {
          name?: string
          email?: string
          role?: 'user' | 'shop' | 'collaborator' | 'admin'
          favorites?: string[]
          loyalty_points?: number
          is_active?: boolean
          updated_at?: string
          fiscal_code?: string
          vat_number?: string
        }
      }
      shops: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          address: string
          phone: string
          email: string
          ai_credits: number
          is_approved: boolean
          promotion_expiry_date?: string
          last_updated: string
          created_at: string
          logo_image?: string
          banner_image?: string
          website_url?: string
          opening_hours?: string
          about_us?: string
          categories?: string[]
          fiscal_code: string
          vat_number: string
          social_links?: Json
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          address: string
          phone: string
          email: string
          ai_credits?: number
          is_approved?: boolean
          promotion_expiry_date?: string
          last_updated?: string
          created_at?: string
          logo_image?: string
          banner_image?: string
          website_url?: string
          opening_hours?: string
          about_us?: string
          categories?: string[]
          fiscal_code: string
          vat_number: string
          social_links?: Json
        }
        Update: {
          user_id?: string
          name?: string
          description?: string
          address?: string
          phone?: string
          email?: string
          ai_credits?: number
          is_approved?: boolean
          promotion_expiry_date?: string
          last_updated?: string
          logo_image?: string
          banner_image?: string
          website_url?: string
          opening_hours?: string
          about_us?: string
          categories?: string[]
          fiscal_code?: string
          vat_number?: string
          social_links?: Json
        }
      }
      products: {
        Row: {
          id: string
          shop_id: string
          name: string
          description: string
          price: number
          discount_price?: number
          category: string
          inventory: number
          images: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          name: string
          description: string
          price: number
          discount_price?: number
          category: string
          inventory: number
          images: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          shop_id?: string
          name?: string
          description?: string
          price?: number
          discount_price?: number
          category?: string
          inventory?: number
          images?: string[]
          is_active?: boolean
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          shop_id: string
          products: Json
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_price: number
          shipping_address: string
          payment_method: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          shop_id: string
          products: Json
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_price: number
          shipping_address: string
          payment_method: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          shop_id?: string
          products?: Json
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total_price?: number
          shipping_address?: string
          payment_method?: string
          updated_at?: string
        }
      }
      offers: {
        Row: {
          id: string
          shop_id: string
          title: string
          description: string
          discount_percentage: number
          start_date: string
          end_date: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          title: string
          description: string
          discount_percentage: number
          start_date: string
          end_date: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          shop_id?: string
          title?: string
          description?: string
          discount_percentage?: number
          start_date?: string
          end_date?: string
          is_active?: boolean
        }
      }
      collaborators: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          coverage_area: string
          availability: string
          rating: number
          completed_tasks: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          phone: string
          coverage_area: string
          availability: string
          rating?: number
          completed_tasks?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          user_id?: string
          name?: string
          email?: string
          phone?: string
          coverage_area?: string
          availability?: string
          rating?: number
          completed_tasks?: number
          is_active?: boolean
        }
      }
      tasks: {
        Row: {
          id: string
          shop_id: string
          collaborator_id?: string
          title: string
          description: string
          status: 'open' | 'assigned' | 'completed' | 'cancelled'
          reward: number
          due_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          shop_id: string
          collaborator_id?: string
          title: string
          description: string
          status?: 'open' | 'assigned' | 'completed' | 'cancelled'
          reward: number
          due_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          shop_id?: string
          collaborator_id?: string
          title?: string
          description?: string
          status?: 'open' | 'assigned' | 'completed' | 'cancelled'
          reward?: number
          due_date?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          slug: string
        }
        Update: {
          name?: string
          description?: string
          slug?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
