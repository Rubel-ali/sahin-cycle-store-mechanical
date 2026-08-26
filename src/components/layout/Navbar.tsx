'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export function Navbar() {
  const t = useTranslations('nav');
  const commonT = useTranslations('common');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

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
          ? 'bg-[#0a0f1e]/95 backdrop-blur-md shadow-md py-3'
          : 'bg-[#0a0f1e] py-4'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-50">
          <Image 
            src="/logo.png"
            alt="Sahin Cycle Store Logo"
            width={48}
            height={48}
            className="w-10 h-10 md:w-12 md:h-12 object-contain transition-all duration-300"
          />
          <span className="font-bold text-xl tracking-tight transition-colors text-white">
            {isRtl ? (
              <>متجر دراجات <span className="text-[#e1251b]">شاهين</span></>
            ) : (
              <>Sahin <span className="text-[#e1251b]">Cycle</span> Store</>
            )}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-slate-300 pb-1',
                pathname === link.href
                  ? 'text-[#e1251b] border-b border-[#e1251b]'
                  : 'text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-slate-300 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-0.5 -translate-y-1 bg-red-600 text-white text-[10px] rounded-full px-1.5 py-0.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="https://wa.me/966000000000"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2.5 bg-gradient-to-r from-red-800 to-red-600 text-white rounded-full text-sm font-medium hover:from-red-700 hover:to-red-500 transition-all shadow-lg shadow-red-500/30 border border-red-500/20 ml-2"
          >
            {commonT('whatsappUs')}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-3 z-50">
          <LanguageSwitcher />
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:text-slate-300 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-0.5 -translate-y-1 bg-red-600 text-white text-[10px] rounded-full px-1.5 py-0.5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-slate-300 transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 stroke-[1.5]" /> : <Menu className="w-6 h-6 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-[#0a0f1e] shadow-xl border-t border-slate-800/50 md:hidden flex flex-col p-6 gap-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block py-3 text-base font-medium transition-colors',
                  pathname === link.href ? 'text-[#e1251b] pl-2 border-l-2 border-[#e1251b] bg-white/5 rounded-r-md' : 'text-white hover:bg-white/5 hover:pl-2 hover:rounded-md'
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/966000000000"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block text-center px-6 py-3 bg-gradient-to-r from-red-800 to-red-600 text-white rounded-full text-base font-medium hover:from-red-700 hover:to-red-500 transition-all shadow-lg shadow-red-500/30 border border-red-500/20"
            >
              {commonT('whatsappUs')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
