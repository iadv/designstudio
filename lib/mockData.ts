import { Designer, ClothingItem } from './types';

export const MOCK_DESIGNERS: Designer[] = [
  {
    id: 'des_fabula',
    slug: 'fabula',
    name: 'FABULA',
    instagram_handle: 'label_fabula',
    website_url: 'https://www.instagram.com/label_fabula/',
    bio: 'Handcrafted luxury womenswear by Thanishka Samineni. Ethereal net gowns, crochet dresses, and contemporary silhouettes made with intention.',
    hero_tagline: 'Wear the story you carry within',
    brand_color_primary: '#0c0a08',
    brand_color_accent: '#d4a853',
    brand_color_text: '#f5f0e8',
    is_active: true,
  },
  {
    id: 'des_luna',
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
];

const BASE = 'https://yvoxviinvpkupkozrqgt.supabase.co/storage/v1/object/public/tryon-photos/fabula';
const IG_BASE = 'https://www.instagram.com/label_fabula';

export const MOCK_CLOTHING: ClothingItem[] = [
  // ─── FABULA Collection ───────────────────────────────────────────────────
  { id: 'fab_01', designer_id: 'des_fabula', name: 'Dusk Veil Gown', description: 'Dreamy net gown with delicate overlay and structured bodice.', image_url: `${BASE}/item_01.jpg`, instagram_post_url: `${IG_BASE}/p/DVdqAe5k8DG/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'gown', display_order: 1 },
  { id: 'fab_02', designer_id: 'des_fabula', name: 'Reverie Net Dress', description: 'Sheer layered net dress with intricate detailing at the hem.', image_url: `${BASE}/item_02.jpg`, instagram_post_url: `${IG_BASE}/p/DVc1Kc1E9rb/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 2 },
  { id: 'fab_03', designer_id: 'des_fabula', name: 'Soleil Sundress', description: 'Flowy sundress with a whimsical overskirt in pastel tones.', image_url: `${BASE}/item_03.jpg`, instagram_post_url: `${IG_BASE}/p/DWeEhuFE322/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'sundress', display_order: 3 },
  { id: 'fab_04', designer_id: 'des_fabula', name: 'Twilight Gown', description: 'Dramatic floor-length net gown for evenings that deserve more.', image_url: `${BASE}/item_04.jpg`, instagram_post_url: `${IG_BASE}/p/DWbadzME4WC/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'gown', display_order: 4 },
  { id: 'fab_05', designer_id: 'des_fabula', name: 'Gossamer Set', description: 'Two-piece net co-ord with a statement overskirt and crop top.', image_url: `${BASE}/item_05.jpg`, instagram_post_url: `${IG_BASE}/p/DWJYHgFk0pB/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'set', display_order: 5 },
  { id: 'fab_06', designer_id: 'des_fabula', name: 'Luna Net Dress', description: 'Celestial-inspired layered net dress with subtle embellishments.', image_url: `${BASE}/item_06.jpg`, instagram_post_url: `${IG_BASE}/p/DWIuC0rE_Dq/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 6 },
  { id: 'fab_07', designer_id: 'des_fabula', name: 'Bloom Ensemble', description: 'Structured and feminine — a blooming statement piece.', image_url: `${BASE}/item_07.jpg`, instagram_post_url: `${IG_BASE}/p/DWA43oGk-5D/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'ensemble', display_order: 7 },
  { id: 'fab_08', designer_id: 'des_fabula', name: 'Cascade Dress', description: 'Cascading layers of sheer net creating movement with every step.', image_url: `${BASE}/item_08.jpg`, instagram_post_url: `${IG_BASE}/p/DV-XdYNkzEA/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 8 },
  { id: 'fab_09', designer_id: 'des_fabula', name: 'Aura Dress', description: 'Luminous net dress that glows against any skin tone.', image_url: `${BASE}/item_09.jpg`, instagram_post_url: `${IG_BASE}/p/DVu82YAE9bi/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 9 },
  { id: 'fab_10', designer_id: 'des_fabula', name: 'Ethereal Net Dress', description: 'Weightless and ethereal — made to be seen and felt.', image_url: `${BASE}/item_10.jpg`, instagram_post_url: `${IG_BASE}/p/DVteMPLk1pD/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'sundress', display_order: 10 },
  { id: 'fab_11', designer_id: 'des_fabula', name: 'Sheer Reverie Dress', description: 'Dreamy sheer layers with a contemporary structured silhouette.', image_url: `${BASE}/item_11.jpg`, instagram_post_url: `${IG_BASE}/p/DVtGPr4k7Vg/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 11 },
  { id: 'fab_12', designer_id: 'des_fabula', name: 'Whisper Net Dress', description: 'Soft and flowing — whispers luxury at every turn.', image_url: `${BASE}/item_12.jpg`, instagram_post_url: `${IG_BASE}/p/DVn_zpIE-pW/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 12 },
  { id: 'fab_13', designer_id: 'des_fabula', name: 'Mist Set', description: 'Delicate net co-ord with a misty, otherworldly drape.', image_url: `${BASE}/item_13.jpg`, instagram_post_url: `${IG_BASE}/p/DVnLRxPk7sp/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 13 },
  { id: 'fab_14', designer_id: 'des_fabula', name: 'Crochet Sun Dress', description: 'Handcrafted crochet sundress — artisanal and one of a kind.', image_url: `${BASE}/item_14.jpg`, instagram_post_url: `${IG_BASE}/p/DVaE_D0E2PZ/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'crochet dress', display_order: 14 },
  { id: 'fab_15', designer_id: 'des_fabula', name: 'Drape Dress', description: 'Effortlessly draped in soft fabric — casual luxury.', image_url: `${BASE}/item_15.jpg`, instagram_post_url: `${IG_BASE}/p/DVYigiRk2bJ/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'dress', display_order: 15 },
  { id: 'fab_16', designer_id: 'des_fabula', name: 'Silhouette Dress', description: 'A dress that sculpts the silhouette with modern femininity.', image_url: `${BASE}/item_16.jpg`, instagram_post_url: `${IG_BASE}/p/DVIQdFnE1wB/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'dress', display_order: 16 },
  { id: 'fab_17', designer_id: 'des_fabula', name: 'Haze Net Dress', description: 'A haze of layered net — mesmerizing and effortlessly chic.', image_url: `${BASE}/item_17.jpg`, instagram_post_url: `${IG_BASE}/p/DU43IH_k2bO/`, buy_url: `${IG_BASE}/`, price: 'DM for price', category: 'net dress', display_order: 17 },

  // ─── Luna Atelier Collection (demo) ──────────────────────────────────────
  { id: 'item_001', designer_id: 'des_luna', name: 'Aura Silk Gown', description: 'Floor-length bias-cut silk gown with hand-stitched embroidery.', image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', instagram_post_url: 'https://www.instagram.com/p/example1/', buy_url: 'https://lunaatelier.com/shop', price: '$1,240', category: 'dress', display_order: 1 },
  { id: 'item_002', designer_id: 'des_luna', name: 'Solstice Blazer', description: 'Oversized ivory wool blazer with sculptural lapel.', image_url: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80', instagram_post_url: 'https://www.instagram.com/p/example2/', buy_url: 'https://lunaatelier.com/shop', price: '$890', category: 'blazer', display_order: 2 },
  { id: 'item_003', designer_id: 'des_luna', name: 'Eclipse Midi', description: 'Deep burgundy crepe midi dress with architectural pleating.', image_url: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80', instagram_post_url: 'https://www.instagram.com/p/example3/', buy_url: 'https://lunaatelier.com/shop', price: '$760', category: 'dress', display_order: 3 },
  { id: 'item_004', designer_id: 'des_luna', name: 'Celestial Set', description: 'Two-piece sand linen set with wide-leg trousers.', image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', instagram_post_url: 'https://www.instagram.com/p/example4/', buy_url: 'https://lunaatelier.com/shop', price: '$520', category: 'set', display_order: 4 },
];

export function getDesignerBySlug(slug: string): Designer | undefined {
  return MOCK_DESIGNERS.find((d) => d.slug === slug);
}

export function getClothingByDesigner(designerId: string): ClothingItem[] {
  return MOCK_CLOTHING
    .filter((c) => c.designer_id === designerId)
    .sort((a, b) => a.display_order - b.display_order);
}
