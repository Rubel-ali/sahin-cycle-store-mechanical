'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors hover:bg-white/10 disabled:opacity-50",
        className
      )}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-white" />
      <span className="text-sm font-medium text-slate-300">
        {locale === 'en' ? 'العربية' : 'EN'}
      </span>
    </button>
  );
}
