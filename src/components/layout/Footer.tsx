'use client';

import { MapPin, CalendarClock, Smartphone, AtSign } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <h2 className="text-4xl leading-tight font-medium text-gray-700 mb-1">Find Us</h2>
            <h2 className="text-4xl leading-tight font-semibold text-gray-900">
              <span className="text-[#e1251b]">Sahin</span> Cycles
            </h2>
            <h2 className="text-4xl leading-tight font-medium text-gray-700 mb-1">Store.</h2>
          </div>

          {/* Column 2: Our Location */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider uppercase">Our Location</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <MapPin className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1} />
                <p className="text-gray-500 text-sm">Arar, Northern Borders KSA</p>
              </div>
              <div className="flex items-center gap-4 group">
                <CalendarClock className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1} />
                <p className="text-gray-500 text-sm">Saturday-Thursday 9:00-21:00</p>
              </div>
            </div>
          </div>

          {/* Column 3: More Information */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider uppercase">More Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <Smartphone className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1} />
                <p className="text-gray-500 text-sm" dir="ltr">+966 50 000 0000</p>
              </div>
              <div className="flex items-center gap-4 group">
                <AtSign className="w-10 h-10 text-[#e1251b] shrink-0" strokeWidth={1} />
                <p className="text-gray-500 text-sm">contact@sahincycle.com</p>
              </div>
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider uppercase">Subscribe</h3>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#e1251b] transition-colors bg-white text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-[#e1251b] hover:bg-red-700 text-white font-bold text-sm tracking-wider uppercase py-3 px-8 self-start transition-colors"
              >
                Sign Up
              </button>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
}
