export interface Testimonial {
  id: string;
  name: { en: string; ar: string };
  rating: number;
  text: { en: string; ar: string };
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: { en: 'Ahmed A.', ar: 'أحمد أ.' },
    rating: 5,
    text: {
      en: 'Best bicycle repair shop in Arar. Fixed my gears in 30 minutes!',
      ar: 'أفضل محل صيانة دراجات في عرعر. أصلحوا التروس في 30 دقيقة!'
    }
  },
  {
    id: '2',
    name: { en: 'Mohammed K.', ar: 'محمد ك.' },
    rating: 5,
    text: {
      en: 'Bought a refurbished bike for my son. Looks and rides like brand new. Highly recommended.',
      ar: 'اشتريت دراجة مجددة لابني. تبدو وتعمل وكأنها جديدة تماماً. أوصي بهم بشدة.'
    }
  },
  {
    id: '3',
    name: { en: 'Sarah M.', ar: 'سارة م.' },
    rating: 5,
    text: {
      en: 'Excellent service and very reasonable prices. The team is very professional.',
      ar: 'خدمة ممتازة وأسعار معقولة جداً. فريق العمل محترف للغاية.'
    }
  },
  {
    id: '4',
    name: { en: 'Omar S.', ar: 'عمر س.' },
    rating: 4,
    text: {
      en: 'Found exactly what I needed for my mountain bike. Great accessories selection.',
      ar: 'وجدت بالضبط ما أحتاجه لدراجتي الجبلية. تشكيلة رائعة من الإكسسوارات.'
    }
  }
];
