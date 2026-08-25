import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const initialProducts = [
  {
    slug: 'mountain-pro-x1',
    nameEn: 'Mountain Pro X1',
    nameAr: 'ماونتن برو إكس 1',
    category: 'new',
    condition: 'new',
    price: 1299,
    currency: 'SAR',
    images: ['/products/bike-1.png'],
    descriptionEn: 'A high-performance mountain bike for all terrains.',
    descriptionAr: 'دراجة جبلية عالية الأداء لجميع التضاريس.',
    featured: true,
    inStock: true
  },
  {
    slug: 'city-cruiser-v2',
    nameEn: 'City Cruiser V2',
    nameAr: 'سيتي كروزر الإصدار 2',
    category: 'used',
    condition: 'used',
    price: 450,
    currency: 'SAR',
    images: ['/products/bike-5.png'],
    descriptionEn: 'Comfortable city bike in excellent condition.',
    descriptionAr: 'دراجة مدينة مريحة بحالة ممتازة.',
    featured: true,
    inStock: true
  },
  {
    slug: 'kids-bmx-star',
    nameEn: 'Kids BMX Star',
    nameAr: 'بي إم إكس ستار للأطفال',
    category: 'kids',
    condition: 'new',
    price: 299,
    currency: 'SAR',
    images: ['/products/bike-3.png'],
    descriptionEn: 'Safe and durable BMX bike for kids aged 7-12.',
    descriptionAr: 'دراجة بي إم إكس آمنة ومتينة للأطفال من سن 7 إلى 12.',
    featured: true,
    inStock: true
  },
  {
    slug: 'baby-scooter-mini',
    nameEn: 'Baby Scooter Mini',
    nameAr: 'سكوتر صغير للأطفال',
    category: 'scooters',
    condition: 'new',
    price: 150,
    currency: 'SAR',
    images: ['/products/bike-4.png'],
    descriptionEn: '3-wheel stable scooter for toddlers.',
    descriptionAr: 'سكوتر بثلاث عجلات ثابت للأطفال الصغار.',
    featured: true,
    inStock: true
  },
  {
    slug: 'roadster-pro',
    nameEn: 'Carbon Roadster Pro',
    nameAr: 'كاربون رودستر برو',
    category: 'new',
    condition: 'new',
    price: 2499,
    currency: 'SAR',
    images: ['/products/bike-5.png'],
    descriptionEn: 'Sleek carbon fiber road racing bike.',
    descriptionAr: 'دراجة سباق على الطريق من ألياف الكربون الأنيقة.',
    featured: true,
    inStock: true
  },
  {
    slug: 'electric-commuter',
    nameEn: 'E-Commuter Plus',
    nameAr: 'إي-كوميوتر بلس',
    category: 'new',
    condition: 'new',
    price: 3200,
    currency: 'SAR',
    images: ['/products/bike-6.png'],
    descriptionEn: 'Modern electric commuter e-bike.',
    descriptionAr: 'دراجة كهربائية حديثة للتنقل.',
    featured: true,
    inStock: true
  },
  {
    slug: 'trail-blazer-pro',
    nameEn: 'Trail Blazer Pro',
    nameAr: 'تريل بليزر برو',
    category: 'new',
    condition: 'new',
    price: 1850,
    currency: 'SAR',
    images: ['/products/trail-blazer-pro.jpg'],
    descriptionEn: 'Robust trail bike built for extreme conditions.',
    descriptionAr: 'دراجة مسارات قوية مصممة للظروف القاسية.',
    featured: true,
    inStock: true
  },
  {
    slug: 'speed-phantom-v3',
    nameEn: 'Speed Phantom V3',
    nameAr: 'سبيد فانتوم في 3',
    category: 'used',
    condition: 'used',
    price: 890,
    currency: 'SAR',
    images: ['/products/speed-phantom-v3.jpg'],
    descriptionEn: 'Lightweight road bike for maximum speed.',
    descriptionAr: 'دراجة طريق خفيفة الوزن لأقصى سرعة.',
    featured: true,
    inStock: true
  },
  {
    slug: 'forge-gravel-pro',
    nameEn: 'Forge Gravel Pro',
    nameAr: 'فورج جرافيل برو',
    category: 'new',
    condition: 'new',
    price: 2100,
    currency: 'SAR',
    images: ['/products/gravel-bike.jpg'],
    descriptionEn: 'Versatile gravel bike for both road and off-road adventures.',
    descriptionAr: 'دراجة حصى متعددة الاستخدامات لمغامرات الطرق الوعرة والممهدة.',
    featured: true,
    inStock: true
  },
  {
    slug: 'norco-fat-tire-max',
    nameEn: 'Norco Fat Tire Max',
    nameAr: 'نوركو فات تاير ماكس',
    category: 'new',
    condition: 'new',
    price: 1950,
    currency: 'SAR',
    images: ['/products/fat-tire-bike.jpg'],
    descriptionEn: 'Rugged fat tire bike for snow, sand, and mud.',
    descriptionAr: 'دراجة ذات إطارات عريضة للثلج والرمل والطين.',
    featured: true,
    inStock: true
  },
  {
    slug: 'urban-commuter-elite',
    nameEn: 'Urban Commuter Elite',
    nameAr: 'أوربان كوميوتر إيليت',
    category: 'new',
    condition: 'new',
    price: 1850,
    currency: 'SAR',
    images: ['/products/urban-commuter-elite.png'],
    descriptionEn: 'Premium urban commuter bike with lightweight frame.',
    descriptionAr: 'دراجة تنقل حضرية فاخرة بهيكل خفيف الوزن.',
    featured: true,
    inStock: true
  },
  {
    slug: 'vintage-city-classic',
    nameEn: 'Vintage City Classic',
    nameAr: 'فينتاج سيتي كلاسيك',
    category: 'used',
    condition: 'used',
    price: 950,
    currency: 'SAR',
    images: ['/products/vintage-city-classic.png'],
    descriptionEn: 'Classic vintage city bike, fully refurbished and ready to ride.',
    descriptionAr: 'دراجة مدينة كلاسيكية عتيقة، تم تجديدها بالكامل وجاهزة للركوب.',
    featured: true,
    inStock: true
  }
];

async function main() {
  console.log('Seeding database...');

  // Create Admin
  const adminPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@sahincycle.com' },
    update: {},
    create: {
      email: 'admin@sahincycle.com',
      password: adminPassword,
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // Insert Products
  for (const product of initialProducts) {
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (!existing) {
      await prisma.product.create({
        data: product,
      });
      console.log(`Product created: ${product.slug}`);
    } else {
      console.log(`Product already exists: ${product.slug}`);
    }
  }

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
