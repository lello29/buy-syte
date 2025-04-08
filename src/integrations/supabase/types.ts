export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      collaborators: {
        Row: {
          availability: string | null
          completed_tasks: number | null
          coverage_area: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          availability?: string | null
          completed_tasks?: number | null
          coverage_area?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          availability?: string | null
          completed_tasks?: number | null
          coverage_area?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          created_at: string | null
          description: string | null
          discount_percentage: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          shop_id: string | null
          start_date: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          shop_id?: string | null
          start_date?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount_percentage?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          shop_id?: string | null
          start_date?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          payment_method: string | null
          products: Json
          shipping_address: string | null
          shop_id: string | null
          status: string | null
          total_price: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          payment_method?: string | null
          products: Json
          shipping_address?: string | null
          shop_id?: string | null
          status?: string | null
          total_price: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          payment_method?: string | null
          products?: Json
          shipping_address?: string | null
          shop_id?: string | null
          status?: string | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          discount_price: number | null
          id: string
          images: Json | null
          inventory: number | null
          is_active: boolean | null
          name: string
          price: number
          shop_id: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          id?: string
          images?: Json | null
          inventory?: number | null
          is_active?: boolean | null
          name: string
          price: number
          shop_id?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          discount_price?: number | null
          id?: string
          images?: Json | null
          inventory?: number | null
          is_active?: boolean | null
          name?: string
          price?: number
          shop_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      shops: {
        Row: {
          about_us: string | null
          address: string | null
          ai_credits: number | null
          banner_image: string | null
          category: string | null
          created_at: string | null
          description: string | null
          email: string | null
          fiscal_code: string | null
          id: string
          is_approved: boolean | null
          last_updated: string | null
          latitude: number | null
          logo_image: string | null
          longitude: number | null
          name: string
          opening_hours: string | null
          phone: string | null
          user_id: string | null
          vat_number: string | null
          website_url: string | null
        }
        Insert: {
          about_us?: string | null
          address?: string | null
          ai_credits?: number | null
          banner_image?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          fiscal_code?: string | null
          id?: string
          is_approved?: boolean | null
          last_updated?: string | null
          latitude?: number | null
          logo_image?: string | null
          longitude?: number | null
          name: string
          opening_hours?: string | null
          phone?: string | null
          user_id?: string | null
          vat_number?: string | null
          website_url?: string | null
        }
        Update: {
          about_us?: string | null
          address?: string | null
          ai_credits?: number | null
          banner_image?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          fiscal_code?: string | null
          id?: string
          is_approved?: boolean | null
          last_updated?: string | null
          latitude?: number | null
          logo_image?: string | null
          longitude?: number | null
          name?: string
          opening_hours?: string | null
          phone?: string | null
          user_id?: string | null
          vat_number?: string | null
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shops_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          collaborator_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          reward: number | null
          shop_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          collaborator_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          reward?: number | null
          shop_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          collaborator_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          reward?: number | null
          shop_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_collaborator_id_fkey"
            columns: ["collaborator_id"]
            isOneToOne: false
            referencedRelation: "collaborators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          favorites: Json | null
          fiscal_code: string | null
          id: string
          is_active: boolean | null
          loyalty_points: number | null
          name: string
          role: string
          updated_at: string | null
          vat_number: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          favorites?: Json | null
          fiscal_code?: string | null
          id?: string
          is_active?: boolean | null
          loyalty_points?: number | null
          name: string
          role: string
          updated_at?: string | null
          vat_number?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          favorites?: Json | null
          fiscal_code?: string | null
          id?: string
          is_active?: boolean | null
          loyalty_points?: number | null
          name?: string
          role?: string
          updated_at?: string | null
          vat_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
