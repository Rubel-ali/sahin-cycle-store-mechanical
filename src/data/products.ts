import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    slug: 'mountain-pro-x1',
    name: {
      en: 'Mountain Pro X1',
      ar: 'ماونتن برو إكس 1'
    },
    category: 'new',
    condition: 'new',
    price: 1299,
    currency: 'SAR',
    images: ['/products/bike-1.png'],
    description: {
      en: 'A high-performance mountain bike for all terrains.',
      ar: 'دراجة جبلية عالية الأداء لجميع التضاريس.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '2',
    slug: 'city-cruiser-v2',
    name: {
      en: 'City Cruiser V2',
      ar: 'سيتي كروزر الإصدار 2'
    },
    category: 'used',
    condition: 'used',
    price: 450,
    currency: 'SAR',
    images: ['/products/bike-5.png'],
    description: {
      en: 'Comfortable city bike in excellent condition.',
      ar: 'دراجة مدينة مريحة بحالة ممتازة.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '3',
    slug: 'kids-bmx-star',
    name: {
      en: 'Kids BMX Star',
      ar: 'بي إم إكس ستار للأطفال'
    },
    category: 'kids',
    condition: 'new',
    price: 299,
    currency: 'SAR',
    images: ['/products/bike-3.png'],
    description: {
      en: 'Safe and durable BMX bike for kids aged 7-12.',
      ar: 'دراجة بي إم إكس آمنة ومتينة للأطفال من سن 7 إلى 12.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '4',
    slug: 'baby-scooter-mini',
    name: {
      en: 'Baby Scooter Mini',
      ar: 'سكوتر صغير للأطفال'
    },
    category: 'scooters',
    condition: 'new',
    price: 150,
    currency: 'SAR',
    images: ['/products/bike-4.png'],
    description: {
      en: '3-wheel stable scooter for toddlers.',
      ar: 'سكوتر بثلاث عجلات ثابت للأطفال الصغار.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '5',
    slug: 'roadster-pro',
    name: {
      en: 'Carbon Roadster Pro',
      ar: 'كاربون رودستر برو'
    },
    category: 'new',
    condition: 'new',
    price: 2499,
    currency: 'SAR',
    images: ['/products/bike-5.png'],
    description: {
      en: 'Sleek carbon fiber road racing bike.',
      ar: 'دراجة سباق على الطريق من ألياف الكربون الأنيقة.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '6',
    slug: 'electric-commuter',
    name: {
      en: 'E-Commuter Plus',
      ar: 'إي-كوميوتر بلس'
    },
    category: 'new',
    condition: 'new',
    price: 3200,
    currency: 'SAR',
    images: ['/products/bike-6.png'],
    description: {
      en: 'Modern electric commuter e-bike.',
      ar: 'دراجة كهربائية حديثة للتنقل.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '7',
    slug: 'trail-blazer-pro',
    name: {
      en: 'Trail Blazer Pro',
      ar: 'تريل بليزر برو'
    },
    category: 'new',
    condition: 'new',
    price: 1850,
    currency: 'SAR',
    images: ['/products/trail-blazer-pro.jpg'],
    description: {
      en: 'Robust trail bike built for extreme conditions.',
      ar: 'دراجة مسارات قوية مصممة للظروف القاسية.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '8',
    slug: 'speed-phantom-v3',
    name: {
      en: 'Speed Phantom V3',
      ar: 'سبيد فانتوم في 3'
    },
    category: 'used',
    condition: 'used',
    price: 890,
    currency: 'SAR',
    images: ['/products/speed-phantom-v3.jpg'],
    description: {
      en: 'Lightweight road bike for maximum speed.',
      ar: 'دراجة طريق خفيفة الوزن لأقصى سرعة.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '9',
    slug: 'forge-gravel-pro',
    name: {
      en: 'Forge Gravel Pro',
      ar: 'فورج جرافيل برو'
    },
    category: 'new',
    condition: 'new',
    price: 2100,
    currency: 'SAR',
    images: ['/products/gravel-bike.jpg'],
    description: {
      en: 'Versatile gravel bike for both road and off-road adventures.',
      ar: 'دراجة حصى متعددة الاستخدامات لمغامرات الطرق الوعرة والممهدة.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '10',
    slug: 'norco-fat-tire-max',
    name: {
      en: 'Norco Fat Tire Max',
      ar: 'نوركو فات تاير ماكس'
    },
    category: 'new',
    condition: 'new',
    price: 1950,
    currency: 'SAR',
    images: ['/products/fat-tire-bike.jpg'],
    description: {
      en: 'Rugged fat tire bike for snow, sand, and mud.',
      ar: 'دراجة ذات إطارات عريضة للثلج والرمل والطين.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '11',
    slug: 'urban-commuter-elite',
    name: {
      en: 'Urban Commuter Elite',
      ar: 'أوربان كوميوتر إيليت'
    },
    category: 'new',
    condition: 'new',
    price: 1850,
    currency: 'SAR',
    images: ['/products/urban-commuter-elite.png'],
    description: {
      en: 'Premium urban commuter bike with lightweight frame.',
      ar: 'دراجة تنقل حضرية فاخرة بهيكل خفيف الوزن.'
    },
    featured: true,
    inStock: true
  },
  {
    id: '12',
    slug: 'vintage-city-classic',
    name: {
      en: 'Vintage City Classic',
      ar: 'فينتاج سيتي كلاسيك'
    },
    category: 'used',
    condition: 'used',
    price: 950,
    currency: 'SAR',
    images: ['/products/vintage-city-classic.png'],
    description: {
      en: 'Classic vintage city bike, fully refurbished and ready to ride.',
      ar: 'دراجة مدينة كلاسيكية عتيقة، تم تجديدها بالكامل وجاهزة للركوب.'
    },
    featured: true,
    inStock: true
  }
];
