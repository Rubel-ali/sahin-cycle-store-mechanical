'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function Navbar() {
  const t = useTranslations('nav');
  const commonT = useTranslations('common');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/products', label: t('products') },
    { href: '/services', label: t('services') },
    { href: '/gallery', label: t('gallery') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50" dir="ltr">
          <Image 
            src="/logo.png"
            alt="Sahin Cycle Store Logo"
            width={48}
            height={48}
            className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300"
          />
          <span className={cn(
            "font-bold text-xl tracking-tight transition-colors",
            isScrolled ? "text-gray-900 dark:text-white" : "text-white"
          )}>
            Sahin <span className="text-[#e1251b]">Cycle</span> Store
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-[#e1251b]',
                pathname === link.href
                  ? 'text-[#e1251b]'
                  : isScrolled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-200'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <a
            href="https://wa.me/966000000000"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-accent text-white rounded-md text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            {commonT('whatsappUs')}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4 z-50">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-900 dark:text-white p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800 md:hidden flex flex-col p-4 gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-base font-medium',
                  pathname === link.href ? 'text-[#e1251b]' : 'text-gray-800 dark:text-gray-200 hover:text-[#e1251b]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/966000000000"
              target="_blank"
              rel="noreferrer"
              className="mt-2 block text-center px-4 py-3 bg-accent text-white rounded-md text-base font-medium"
            >
              {commonT('whatsappUs')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
