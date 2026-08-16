export interface FAQ {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: {
      en: 'Do you offer same-day repair services?',
      ar: 'هل تقدمون خدمات الصيانة في نفس اليوم؟'
    },
    answer: {
      en: 'Yes, most of our repair services including tire replacement, brake adjustments, and chain repairs are completed on the same day.',
      ar: 'نعم، معظم خدمات الصيانة لدينا بما في ذلك استبدال الإطارات وضبط الفرامل وإصلاح السلسلة تتم في نفس اليوم.'
    }
  },
  {
    id: '2',
    question: {
      en: 'Do you buy used bicycles?',
      ar: 'هل تشترون الدراجات المستعملة؟'
    },
    answer: {
      en: 'Yes, we buy used bicycles in good condition. Bring your bike to our store for an evaluation.',
      ar: 'نعم، نشتري الدراجات المستعملة بحالة جيدة. أحضر دراجتك إلى متجرنا للتقييم.'
    }
  },
  {
    id: '3',
    question: {
      en: 'Do you sell spare parts for all bicycle brands?',
      ar: 'هل تبيعون قطع غيار لجميع أنواع الدراجات؟'
    },
    answer: {
      en: 'We stock spare parts for the most popular brands. If we don\'t have it, we can order it for you.',
      ar: 'نوفر قطع الغيار لأشهر الماركات. إذا لم يكن متوفراً لدينا، يمكننا طلبه لك.'
    }
  },
  {
    id: '4',
    question: {
      en: 'Can I book a repair service online?',
      ar: 'هل يمكنني حجز خدمة الصيانة عبر الإنترنت؟'
    },
    answer: {
      en: 'Currently, you can book an appointment by contacting us via WhatsApp. We respond very quickly!',
      ar: 'حالياً، يمكنك حجز موعد عن طريق التواصل معنا عبر واتساب. نحن نرد بسرعة كبيرة!'
    }
  }
];
