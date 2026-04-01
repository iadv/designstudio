import { Designer, ClothingItem } from './types';

// ─────────────────────────────────────────────
//  MOCK DESIGNERS
// ─────────────────────────────────────────────
export const MOCK_DESIGNERS: Designer[] = [
  {
    id: 'des_001',
    slug: 'luna-atelier',
    name: 'Luna Atelier',
    instagram_handle: 'lunaatelier',
    website_url: 'https://lunaatelier.com',
    bio: 'Luxury womenswear crafted with intention. Where timeless silhouettes meet contemporary spirit.',
    hero_tagline: 'Wear the light you carry within',
    brand_color_primary: '#0d0d14',
    brand_color_accent: '#c9a96e',
    brand_color_text: '#f5f0e8',
    is_active: true,
  },
  {
    id: 'des_002',
    slug: 'noir-collective',
    name: 'Noir Collective',
    instagram_handle: 'noircollective',
    website_url: 'https://noircollective.co',
    bio: 'Monochromatic minimalism for the modern iconoclast.',
    hero_tagline: 'Silence is the loudest statement',
    brand_color_primary: '#090909',
    brand_color_accent: '#e8e8e8',
    brand_color_text: '#ffffff',
    is_active: true,
  },
];

// ─────────────────────────────────────────────
//  MOCK CLOTHING ITEMS (using Unsplash fashion images)
// ─────────────────────────────────────────────
export const MOCK_CLOTHING: ClothingItem[] = [
  // Luna Atelier collection
  {
    id: 'item_001',
    designer_id: 'des_001',
    name: 'Aura Silk Gown',
    description: 'Floor-length bias-cut silk gown with hand-stitched embroidery at the neckline.',
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    instagram_post_url: 'https://www.instagram.com/p/example1/',
    buy_url: 'https://lunaatelier.com/shop/aura-silk-gown',
    price: '$1,240',
    category: 'dress',
    display_order: 1,
  },
  {
    id: 'item_002',
    designer_id: 'des_001',
    name: 'Solstice Blazer',
    description: 'Oversized ivory wool blazer with sculptural lapel and raw edge hem.',
    image_url: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80',
    instagram_post_url: 'https://www.instagram.com/p/example2/',
    buy_url: 'https://lunaatelier.com/shop/solstice-blazer',
    price: '$890',
    category: 'blazer',
    display_order: 2,
  },
  {
    id: 'item_003',
    designer_id: 'des_001',
    name: 'Eclipse Midi Dress',
    description: 'Deep burgundy crepe midi dress with architectural pleating and open back.',
    image_url: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80',
    instagram_post_url: 'https://www.instagram.com/p/example3/',
    buy_url: 'https://lunaatelier.com/shop/eclipse-midi',
    price: '$760',
    category: 'dress',
    display_order: 3,
  },
  {
    id: 'item_004',
    designer_id: 'des_001',
    name: 'Celestial Set',
    description: 'Two-piece sand linen set — wide-leg trousers and cropped halter top.',
    image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    instagram_post_url: 'https://www.instagram.com/p/example4/',
    buy_url: 'https://lunaatelier.com/shop/celestial-set',
    price: '$520',
    category: 'set',
    display_order: 4,
  },
  {
    id: 'item_005',
    designer_id: 'des_001',
    name: 'Lumière Top',
    description: 'Ruched satin top with plunging V-neck and subtle metallic thread detail.',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    instagram_post_url: 'https://www.instagram.com/p/example5/',
    buy_url: 'https://lunaatelier.com/shop/lumiere-top',
    price: '$340',
    category: 'top',
    display_order: 5,
  },
  {
    id: 'item_006',
    designer_id: 'des_001',
    name: 'Dusk Wrap Dress',
    description: 'Fluid wrap dress in deep sage with cascading sleeves and adjustable tie.',
    image_url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80',
    instagram_post_url: 'https://www.instagram.com/p/example6/',
    buy_url: 'https://lunaatelier.com/shop/dusk-wrap',
    price: '$680',
    category: 'dress',
    display_order: 6,
  },
];

export function getDesignerBySlug(slug: string): Designer | undefined {
  return MOCK_DESIGNERS.find((d) => d.slug === slug);
}

export function getClothingByDesigner(designerId: string): ClothingItem[] {
  return MOCK_CLOTHING.filter((c) => c.designer_id === designerId)
    .sort((a, b) => a.display_order - b.display_order);
}
