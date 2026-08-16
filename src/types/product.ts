export interface Product {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  category: 'new' | 'used' | 'refurbished' | 'kids' | 'scooters' | 'accessories';
  condition: 'new' | 'used' | 'refurbished';
  price: number;
  currency: 'SAR';
  images: string[];
  description: { en: string; ar: string };
  featured: boolean;
  inStock: boolean;
}
