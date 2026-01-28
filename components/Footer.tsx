import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-navy-section text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-water-500 via-primary-700 to-accent-500" />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-water-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-500/5 rounded-full blur-[80px]" />
      </div>
      
      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size="lg" />
              <div>
                <span className="font-black text-2xl tracking-wider">KNUDEL</span>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-water-400 font-semibold uppercase tracking-wider">Sanitär</span>
                  <span className="text-accent-400">•</span>
                  <span className="text-accent-400 font-semibold uppercase tracking-wider">Heizung</span>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Ihr kompetenter Partner für Heizung und Sanitär in Bad Oeynhausen und Löhne.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/heizung" className="text-gray-400 hover:text-water-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                  Heizung & Haustechnik
                </Link>
              </li>
              <li>
                <Link href="/sanitaer" className="text-gray-400 hover:text-water-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-water-500 rounded-full" />
                  Bäder & Sanitär
                </Link>
              </li>
              <li>
                <Link href="/kundendienst" className="text-gray-400 hover:text-water-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                  Kundendienst
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-gray-400 hover:text-water-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-water-500 rounded-full" />
                  Terminbuchung
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  Koblenzer Str. 34<br />
                  32584 Löhne
                </span>
              </li>
              <li>
                <a 
                  href="tel:05731-28226" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="h-5 w-5 text-accent-500" />
                  <span className="font-semibold">05731 / 28 22 6</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@knudel-gmbh.de" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-5 w-5 text-water-500" />
                  info@knudel-gmbh.de
                </a>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Bürozeiten</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Mo - Fr:</span>
                <span className="font-semibold text-white">08:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samstag:</span>
                <span>nach Vereinbarung</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              Termine außerhalb der Bürozeiten nach telefonischer Vereinbarung
            </p>
          </div>
        </div>

        {/* Partners */}
        <div className="border-t border-primary-700/50 mt-8 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 text-center">
            Unsere Partner
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["Viessmann", "Junkers", "Bosch", "Brötje"].map((partner) => (
              <span key={partner} className="text-gray-500 text-sm font-medium hover:text-water-400 transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-700/50 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Knudel GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/impressum" className="text-gray-500 hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-gray-500 hover:text-white transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
