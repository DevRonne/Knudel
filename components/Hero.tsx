import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white overflow-hidden min-h-[70vh] md:min-h-[85vh] flex items-center">
      {/* Clean gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left cyan glow */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-water-500/10 to-transparent" />
        {/* Right orange glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-500/10 to-transparent" />
        {/* Soft ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-water-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Subtle accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-water-500 via-transparent to-accent-500" />

      <div className="container-custom relative z-20">
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Logo and tagline */}
              <div className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
                <Logo size="lg" className="md:hidden" />
                <Logo size="xl" className="hidden md:block" />
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-white">
                    KNUDEL
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-water-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                      Sanitär
                    </span>
                    <span className="text-accent-400 text-base sm:text-lg">•</span>
                    <span className="text-accent-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
                      Heizung
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Ihr Partner für{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-500">
                  Wärme
                </span>{" "}
                und{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-water-300 to-water-500">
                  Wasser
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-xl">
                Kompetenter und zuverlässiger Service für Heizung, Sanitär und 
                Haustechnik in Bad Oeynhausen und Löhne.
              </p>

              {/* Phone number */}
              <div className="mb-6 sm:mb-8">
                <a
                  href="tel:05731-28226"
                  className="inline-flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl font-bold text-white hover:text-water-300 transition-colors"
                >
                  <Phone className="h-6 w-6 sm:h-7 sm:w-7 text-accent-400" />
                  05731 / 28 22 6
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 sm:hover:scale-105"
                >
                  <Calendar className="h-5 w-5" />
                  Termin vereinbaren
                </Link>
                <Link
                  href="/kundendienst"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all border border-white/20 hover:border-white/40"
                >
                  Kundendienst
                </Link>
              </div>
            </div>

            {/* Van image */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <img 
                  src="/images/knudel-van.png" 
                  alt="Knudel Servicefahrzeug" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean bottom transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80 L0 40 Q720 0 1440 40 L1440 80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
