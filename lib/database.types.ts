export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            articles: {
                Row: {
                    author_id: string | null
                    category: Database["public"]["Enums"]["article_category"] | null
                    content_en: string | null
                    content_zh: string | null
                    cover_image: string | null
                    created_at: string
                    excerpt_en: string | null
                    excerpt_zh: string | null
                    id: string
                    published_at: string | null
                    slug: string
                    status: Database["public"]["Enums"]["content_status"] | null
                    title_en: string
                    title_zh: string
                    updated_at: string
                }
                Insert: {
                    author_id?: string | null
                    category?: Database["public"]["Enums"]["article_category"] | null
                    content_en?: string | null
                    content_zh?: string | null
                    cover_image?: string | null
                    created_at?: string
                    excerpt_en?: string | null
                    excerpt_zh?: string | null
                    id?: string
                    published_at?: string | null
                    slug: string
                    status?: Database["public"]["Enums"]["content_status"] | null
                    title_en: string
                    title_zh: string
                    updated_at?: string
                }
                Update: {
                    author_id?: string | null
                    category?: Database["public"]["Enums"]["article_category"] | null
                    content_en?: string | null
                    content_zh?: string | null
                    cover_image?: string | null
                    created_at?: string
                    excerpt_en?: string | null
                    excerpt_zh?: string | null
                    id?: string
                    published_at?: string | null
                    slug: string
                    status?: Database["public"]["Enums"]["content_status"] | null
                    title_en: string
                    title_zh: string
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "articles_author_id_fkey"
                        columns: ["author_id"]
                        isOneToOne: false
                        referencedRelation: "designers"
                        referencedColumns: ["id"]
                    },
                ]
            }
            designers: {
                Row: {
                    avatar_url: string | null
                    bio_en: string | null
                    bio_zh: string | null
                    created_at: string
                    id: string
                    is_active: boolean | null
                    location_id: string | null
                    name_en: string
                    name_zh: string
                    role_en: string
                    role_zh: string
                    slug: string
                    sort_order: number | null
                    updated_at: string
                }
                Insert: {
                    avatar_url?: string | null
                    bio_en?: string | null
                    bio_zh?: string | null
                    created_at?: string
                    id?: string
                    is_active?: boolean | null
                    location_id?: string | null
                    name_en: string
                    name_zh: string
                    role_en: string
                    role_zh: string
                    slug: string
                    sort_order?: number | null
                    updated_at?: string
                }
                Update: {
                    avatar_url?: string | null
                    bio_en?: string | null
                    bio_zh?: string | null
                    created_at?: string
                    id?: string
                    is_active?: boolean | null
                    location_id?: string | null
                    name_en?: string
                    name_zh?: string
                    role_en?: string
                    role_zh?: string
                    slug?: string
                    sort_order?: number | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "designers_location_id_fkey"
                        columns: ["location_id"]
                        isOneToOne: false
                        referencedRelation: "locations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            jobs: {
                Row: {
                    created_at: string
                    description_en: string | null
                    description_zh: string | null
                    id: string
                    is_active: boolean | null
                    location_id: string | null
                    requirements_en: string[] | null
                    requirements_zh: string[] | null
                    title_en: string
                    title_zh: string
                    type: Database["public"]["Enums"]["job_type"] | null
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    description_en?: string | null
                    description_zh?: string | null
                    id?: string
                    is_active?: boolean | null
                    location_id?: string | null
                    requirements_en?: string[] | null
                    requirements_zh?: string[] | null
                    title_en: string
                    title_zh: string
                    type?: Database["public"]["Enums"]["job_type"] | null
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    description_en?: string | null
                    description_zh?: string | null
                    id?: string
                    is_active?: boolean | null
                    location_id?: string | null
                    requirements_en?: string[] | null
                    requirements_zh?: string[] | null
                    title_en?: string
                    title_zh?: string
                    type?: Database["public"]["Enums"]["job_type"] | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "jobs_location_id_fkey"
                        columns: ["location_id"]
                        isOneToOne: false
                        referencedRelation: "locations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            locations: {
                Row: {
                    address_en: string | null
                    address_zh: string | null
                    created_at: string
                    email: string | null
                    google_maps_url: string | null
                    id: string
                    name_en: string
                    name_zh: string
                    phone: string | null
                    slug: string
                    updated_at: string
                }
                Insert: {
                    address_en?: string | null
                    address_zh?: string | null
                    created_at?: string
                    email?: string | null
                    google_maps_url?: string | null
                    id?: string
                    name_en: string
                    name_zh: string
                    phone?: string | null
                    slug: string
                    updated_at?: string
                }
                Update: {
                    address_en?: string | null
                    address_zh?: string | null
                    created_at?: string
                    email?: string | null
                    google_maps_url?: string | null
                    id?: string
                    name_en?: string
                    name_zh?: string
                    phone?: string | null
                    slug?: string
                    updated_at?: string
                }
                Relationships: []
            }
            product_pages: {
                Row: {
                    created_at: string
                    features_en: string[] | null
                    features_zh: string[] | null
                    how_to_use_en: string | null
                    how_to_use_zh: string | null
                    id: string
                    ingredients_en: string | null
                    ingredients_zh: string | null
                    slug: string
                    stripe_product_id: string
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    features_en?: string[] | null
                    features_zh?: string[] | null
                    how_to_use_en?: string | null
                    how_to_use_zh?: string | null
                    id?: string
                    ingredients_en?: string | null
                    ingredients_zh?: string | null
                    slug: string
                    stripe_product_id: string
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    features_en?: string[] | null
                    features_zh?: string[] | null
                    how_to_use_en?: string | null
                    how_to_use_zh?: string | null
                    id?: string
                    ingredients_en?: string | null
                    ingredients_zh?: string | null
                    slug?: string
                    stripe_product_id?: string
                    updated_at?: string
                }
                Relationships: []
            }
            works: {
                Row: {
                    created_at: string
                    designer_id: string
                    id: string
                    image_url: string
                    sort_order: number | null
                    title: string | null
                }
                Insert: {
                    created_at?: string
                    designer_id: string
                    id?: string
                    image_url: string
                    sort_order?: number | null
                    title?: string | null
                }
                Update: {
                    created_at?: string
                    designer_id?: string
                    id?: string
                    image_url?: string
                    sort_order?: number | null
                    title?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "works_designer_id_fkey"
                        columns: ["designer_id"]
                        isOneToOne: false
                        referencedRelation: "designers"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            article_category: "stories" | "culture" | "guides" | "news"
            content_status: "draft" | "review" | "published" | "archived"
            job_type: "full_time" | "part_time" | "freelance" | "contract"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
