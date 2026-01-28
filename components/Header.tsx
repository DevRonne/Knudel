"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

const navigation = [
  { name: "Startseite", href: "/" },
  { name: "Heizung", href: "/heizung" },
  { name: "Sanitär", href: "/sanitaer" },
  { name: "Kundendienst", href: "/kundendienst" },
  { name: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar with phone - darker navy like van */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white py-2 relative overflow-hidden">
        {/* Subtle accent lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-water-500/50 to-transparent" />
        <div className="container-custom flex justify-between items-center text-sm relative z-10">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-water-400 font-medium">Sanitär</span>
            <span className="text-accent-400">•</span>
            <span className="text-accent-400 font-medium">Heizung</span>
            <span className="text-water-400">•</span>
            <span className="text-gray-400">Kundendienst</span>
          </div>
          <a 
            href="tel:05731-28226" 
            className="flex items-center gap-2 font-semibold hover:text-water-300 transition-colors"
          >
            <Phone className="h-4 w-4 text-accent-400" />
            <span>05731 / 28 22 6</span>
          </a>
        </div>
      </div>

      {/* Main navigation - white with shadow */}
      <nav className="bg-white shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-18 py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Logo size="lg" />
              <div>
                <span className="font-black text-2xl text-primary-900 tracking-wider group-hover:text-primary-700 transition-colors">
                  KNUDEL
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-water-600 font-semibold uppercase tracking-wider">Sanitär</span>
                  <span className="text-accent-500">•</span>
                  <span className="text-accent-500 font-semibold uppercase tracking-wider">Heizung</span>
                </div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-800 font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-water-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                Termin buchen
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-primary-800 hover:text-primary-600 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col gap-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary-700 font-medium transition-colors py-2 px-2 rounded-lg hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/kontakt"
                  className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-4 py-3 rounded-lg font-bold transition-all text-center shadow-md mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Termin buchen
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
