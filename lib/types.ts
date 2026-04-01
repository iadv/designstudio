export interface Designer {
  id: string;
  slug: string;
  name: string;
  instagram_handle: string;
  website_url?: string;
  bio: string;
  logo_url?: string;
  hero_tagline: string;
  brand_color_primary: string;
  brand_color_accent: string;
  brand_color_text: string;
  is_active: boolean;
}

export interface ClothingItem {
  id: string;
  designer_id: string;
  name: string;
  description: string;
  image_url: string;
  instagram_post_url: string;
  instagram_media_id?: string;
  buy_url: string;
  price: string;
  category: string;
  display_order: number;
}

export interface TryonResult {
  id: string;
  customer_id: string;
  clothing_item_id: string;
  designer_id: string;
  generated_image_url?: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  error?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  email?: string;
  photo_url: string;
  session_token: string;
}
