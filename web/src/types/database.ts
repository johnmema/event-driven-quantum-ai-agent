export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      shows: {
        Row: {
          id: number;
          title: string;
          slug: string | null;
          poster_url: string | null;
          priority: number | null;
          synopsis: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          slug?: string | null;
          poster_url?: string | null;
          priority?: number | null;
          synopsis?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          slug?: string | null;
          poster_url?: string | null;
          priority?: number | null;
          synopsis?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          id: number;
          question: string;
          answer: string;
          order_index: number | null;
          updated_at: string | null;
        };
        Insert: {
          id?: number;
          question: string;
          answer: string;
          order_index?: number | null;
          updated_at?: string | null;
        };
        Update: {
          id?: number;
          question?: string;
          answer?: string;
          order_index?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Row"];

export type TablesInsert<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Insert"];

export type TablesUpdate<TableName extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][TableName]["Update"];
