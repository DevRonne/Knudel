import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Partners from "@/components/Partners";
import WorkShowcase from "@/components/WorkShowcase";
import DiagonalDivider, { DiagonalStripe } from "@/components/DiagonalDivider";
import Link from "next/link";
import {
  Flame,
  Droplets,
  Wrench,
  Shield,
  Phone,
  CheckCircle,
  Wifi,
  Award,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50 relative">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1 w-12 bg-water-500 rounded-full" />
              <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                Unsere Leistungen
              </span>
              <span className="h-1 w-12 bg-accent-500 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kompetenz in{" "}
              <span className="gradient-text-water">Sanitär</span> &{" "}
              <span className="gradient-text-flame">Heizung</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Kompetenter Service für alle Bereiche der Haustechnik – 
              von der Planung bis zur Wartung.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Heizung & Haustechnik"
              description="Moderne Heizsysteme für optimale Wärme und Effizienz. Öl-, Gas- und Hybridheizungen."
              icon={Flame}
              href="/heizung"
              variant="heat"
              features={[
                "Heizungstausch & Neuinstallation",
                "Energieeffiziente Anlagen",
                "Kesselwartung & -umstellung",
              ]}
            />
            <ServiceCard
              title="Bäder & Sanitär"
              description="Komplette Badplanung und -sanierung. Vom Wasserhahn bis zur Traumoase."
              icon={Droplets}
              href="/sanitaer"
              variant="water"
              features={[
                "Badsanierung & Modernisierung",
                "Sanitärinstallation",
                "Enthärtungsanlagen",
              ]}
            />
            <ServiceCard
              title="Kundendienst"
              description="Schnelle Hilfe bei Störungen. Wartung und Reparatur für Privat und Industrie."
              icon={Wrench}
              href="/kundendienst"
              variant="default"
              features={[
                "Notfall-Reparaturen",
                "Regelmäßige Wartung",
                "Rohrbruchbehebung",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Diagonal Stripe Transition */}
      <DiagonalStripe className="h-32 -mt-8" />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-1 w-8 bg-water-500 rounded-full" />
                <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                  Qualität seit über 20 Jahren
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Warum <span className="text-primary-800">Knudel</span> GmbH?
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Als Familienunternehmen stehen wir für Qualität, Zuverlässigkeit 
                und persönlichen Service. Unsere erfahrenen Mitarbeiter kümmern 
                sich um alle Bereiche Ihrer Haustechnik.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle, text: "Über 20 Jahre Erfahrung", color: "text-water-500" },
                  { icon: Shield, text: "Zuverlässiger Service", color: "text-accent-500" },
                  { icon: Award, text: "Zertifizierter Fachbetrieb", color: "text-water-500" },
                  { icon: Wifi, text: "Fernwartung möglich", color: "text-accent-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                    <span className="font-medium text-gray-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-water-100/50 to-primary-50/50 rounded-3xl -rotate-2" />
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-water-100 rounded-xl flex items-center justify-center">
                    <Wifi className="h-6 w-6 text-water-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Fernüberwachung & Fernwartung
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Mit dem Vitoconnect 100 System können wir Ihre Heizung aus der 
                  Ferne überwachen und Störungen frühzeitig erkennen und beheben – 
                  auch wenn Sie im Urlaub sind.
                </p>
                <ul className="space-y-3">
                  {[
                    "Fernzugriff auf Ihr Heizsystem",
                    "Optimierung der Betriebsparameter",
                    "Frühzeitige Störungserkennung",
                    "Steuerung per App möglich",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-water-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Showcase Section */}
      <WorkShowcase />

      {/* Partners Section */}
      <Partners />

      {/* Fördermittel Section - with van-style design */}
      <section className="py-20 md:py-28 bg-navy-section text-white relative overflow-hidden">
        {/* Decorative splash elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-water-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        </div>
        
        {/* Diagonal accent lines */}
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="50" x2="1440" y2="20" stroke="#00b4d8" strokeWidth="1" opacity="0.2" />
            <line x1="0" y1="380" x2="1440" y2="350" stroke="#ff6600" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-0.5 w-12 bg-water-400 rounded-full" />
              <span className="text-water-400 font-semibold uppercase tracking-wider text-sm">
                Fördermittel
              </span>
              <span className="h-0.5 w-12 bg-accent-400 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Staatliche Fördermittel nutzen
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Bei zahlreichen Baumaßnahmen im Bereich Heizung & Sanitär haben Sie 
              Anspruch auf finanzielle Unterstützung durch KfW oder BAFA. 
              Wir beraten Sie gerne zu den Möglichkeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Jetzt beraten lassen
              </Link>
              <a
                href="https://www.kfw.de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-water-600/30 hover:bg-water-600/50 text-white px-8 py-4 rounded-lg font-bold transition-colors border-2 border-water-400/50 hover:border-water-400"
              >
                KfW Förderprogramme
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-2xl">
            {/* Decorative elements - water splash style */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-flame-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bereit für Ihr Projekt?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Kontaktieren Sie uns noch heute für eine unverbindliche Beratung. 
                Wir freuen uns auf Ihr Projekt!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-white text-accent-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:scale-105"
                >
                  Termin buchen
                </Link>
                <a
                  href="tel:05731-28226"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-lg font-bold transition-colors border-2 border-white/30"
                >
                  <Phone className="h-5 w-5" />
                  05731 / 28 22 6
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
