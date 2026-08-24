export type Category = "All" | "MTB/Adult" | "Kids Bikes" | "Road/Hybrid" | "Accessories";
export type WheelSize = "20\"" | "24\"" | "26\"" | "27.5\"" | "29\"";

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: Exclude<Category, "All">;
  categoryAr?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  specs: {
    speed?: string;
    brakes?: string;
    frame?: string;
    wheelSize?: WheelSize;
  };
  badge?: string;
  badgeAr?: string;
  shortDescription: string;
  shortDescriptionAr?: string;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Carbon Road Master Pro",
    nameAr: "دراجة كربون رود ماستر برو",
    category: "Road/Hybrid",
    categoryAr: "طريق/هجين",
    price: 3499,
    originalPrice: 4200,
    image: "/products/bike-5.png",
    rating: 4.9,
    reviews: 128,
    inStock: true,
    badge: "-15% OFF",
    badgeAr: "خصم 15%",
    specs: { speed: "22-Speed", brakes: "Hydraulic Disc", frame: "Carbon Fiber", wheelSize: "29\"" },
    shortDescription: "A high-end aerodynamic road bike designed for competitive racing. Features a full carbon frame and precise 22-speed shifting.",
    shortDescriptionAr: "دراجة طريق ديناميكية هوائية راقية مصممة للسباقات التنافسية. تتميز بهيكل كربوني بالكامل ونقل حركة دقيق 22 سرعة."
  },
  {
    id: "p2",
    name: "Trail Blazer MTB",
    nameAr: "دراجة جبلية تريل بليزر",
    category: "MTB/Adult",
    categoryAr: "جبلي/للبالغين",
    price: 1850,
    image: "/products/bike-6.png",
    rating: 4.7,
    reviews: 84,
    inStock: true,
    badge: "Best Seller",
    badgeAr: "الأكثر مبيعا",
    specs: { speed: "21-Speed", brakes: "Mechanical Disc", frame: "Alloy 6061", wheelSize: "27.5\"" },
    shortDescription: "Rugged and reliable mountain bike built for off-road trails. Equipped with front suspension and durable 27.5-inch knobby tires.",
    shortDescriptionAr: "دراجة جبلية متينة وموثوقة مصممة للمسارات الوعرة. مزودة بتعليق أمامي وإطارات مقاس 27.5 بوصة."
  },
  {
    id: "p3",
    name: "JoyRide Kids Special",
    nameAr: "دراجة أطفال جوي رايد",
    category: "Kids Bikes",
    categoryAr: "دراجات أطفال",
    price: 450,
    originalPrice: 550,
    image: "/products/bike-3.png",
    rating: 4.8,
    reviews: 56,
    inStock: true,
    specs: { brakes: "V-Brake", frame: "Steel", wheelSize: "20\"" },
    shortDescription: "The perfect starter bike for young riders. Features a sturdy steel frame, coaster brakes, and vibrant colors.",
    shortDescriptionAr: "الدراجة المثالية لتعليم الركوب للصغار. تتميز بهيكل فولاذي متين وألوان نابضة بالحياة."
  },
  {
    id: "p4",
    name: "City Commuter Elite",
    nameAr: "سيتي كوميوتر إيليت",
    category: "Road/Hybrid",
    categoryAr: "طريق/هجين",
    price: 1200,
    image: "/products/bike-1.png",
    rating: 4.5,
    reviews: 42,
    inStock: false,
    specs: { speed: "7-Speed", brakes: "V-Brake", frame: "Alloy", wheelSize: "26\"" },
    shortDescription: "A comfortable hybrid cycle tailored for daily urban commuting. Comes with an ergonomic saddle and easy-to-use 7-speed gearing.",
    shortDescriptionAr: "دراجة هجينة مريحة مصممة للتنقل الحضري اليومي. تأتي مع سرج مريح وتروس من 7 سرعات سهلة الاستخدام."
  },
  {
    id: "p5",
    name: "BMX Street Pro",
    nameAr: "بي إم إكس ستريت برو",
    category: "MTB/Adult",
    categoryAr: "جبلي/للبالغين",
    price: 890,
    image: "/products/bike-3.png",
    rating: 4.6,
    reviews: 95,
    inStock: true,
    badge: "New Arrival",
    badgeAr: "وصل حديثاً",
    specs: { speed: "Single", brakes: "U-Brake", frame: "Chromoly", wheelSize: "20\"" },
    shortDescription: "Built tough for street and park riding. The lightweight chromoly frame and strong 20-inch wheels handle extreme tricks effortlessly.",
    shortDescriptionAr: "مصممة بقوة للقيادة في الشوارع والمتنزهات. الهيكل خفيف الوزن والكرومولي يتعامل مع الحيل الشديدة دون عناء."
  },
  {
    id: "p6",
    name: "Junior Trail Maker",
    nameAr: "جونيور تريل ميكر",
    category: "Kids Bikes",
    categoryAr: "دراجات أطفال",
    price: 600,
    image: "/products/bike-3.png",
    rating: 4.7,
    reviews: 33,
    inStock: true,
    specs: { speed: "6-Speed", brakes: "V-Brake", frame: "Alloy", wheelSize: "24\"" },
    shortDescription: "A capable 24-inch kids' mountain bike. Perfect for children graduating from single speeds and hitting their first dirt trails.",
    shortDescriptionAr: "دراجة جبلية للأطفال مقاس 24 بوصة. مثالية للأطفال الذين يتخرجون من الدراجات ذات السرعة الواحدة."
  },
  {
    id: "p7",
    name: "Pro MTB X1",
    nameAr: "برو إم تي بي إكس 1",
    category: "MTB/Adult",
    categoryAr: "جبلي/للبالغين",
    price: 2100,
    originalPrice: 2500,
    image: "/products/bike-6.png",
    rating: 4.9,
    reviews: 210,
    inStock: true,
    badge: "-16% OFF",
    badgeAr: "خصم 16%",
    specs: { speed: "12-Speed", brakes: "Hydraulic Disc", frame: "Carbon Fiber", wheelSize: "29\"" },
    shortDescription: "An elite cross-country mountain bike. Boasts a lightweight carbon frame and a 1x12 drivetrain for rapid climbing.",
    shortDescriptionAr: "دراجة جبلية مميزة لاختراق الضاحية. تتميز بهيكل كربوني خفيف الوزن ونظام نقل حركة 1x12."
  },
  {
    id: "p8",
    name: "Kids BMX Star",
    nameAr: "دراجة أطفال بي إم إكس ستار",
    category: "Kids Bikes",
    categoryAr: "دراجات أطفال",
    price: 350,
    image: "/products/bike-1.png",
    rating: 4.4,
    reviews: 28,
    inStock: true,
    specs: { speed: "Single", brakes: "Coaster", frame: "Steel", wheelSize: "20\"" },
    shortDescription: "A highly durable kids' bike styled after classic BMX frames. It is extremely safe and requires minimal maintenance.",
    shortDescriptionAr: "دراجة أطفال متينة للغاية مصممة على غرار إطارات بي إم إكس الكلاسيكية. آمنة للغاية وتتطلب الحد الأدنى من الصيانة."
  },
  {
    id: "p9",
    name: "Premium Kids Scooter",
    nameAr: "سكوتر أطفال بريميوم",
    category: "Accessories",
    categoryAr: "إكسسوارات",
    price: 250,
    image: "/products/bike-4.png", 
    rating: 4.8,
    reviews: 145,
    inStock: true,
    badge: "Essential",
    badgeAr: "أساسي",
    specs: { frame: "Polycarbonate" },
    shortDescription: "A stable three-wheeled scooter designed to teach balance and coordination to toddlers safely.",
    shortDescriptionAr: "سكوتر مستقر بثلاث عجلات مصمم لتعليم التوازن والتنسيق للأطفال الصغار بأمان."
  }
];
