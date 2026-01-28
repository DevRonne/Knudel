import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Flame,
  Thermometer,
  Leaf,
  Settings,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Heizung & Haustechnik | Knudel Haustechnik",
  description:
    "Moderne Heizsysteme für optimale Wärme und Effizienz. Öl-, Gas- und Hybridheizungen. Installation, Wartung und Reparatur in Bad Oeynhausen und Löhne.",
};

const services = [
  {
    icon: Flame,
    title: "Heizungstausch",
    description:
      "Modernisieren Sie Ihre alte Heizung und sparen Sie Energiekosten mit einer effizienten neuen Anlage.",
  },
  {
    icon: Thermometer,
    title: "Gasheizung",
    description:
      "Zuverlässige und effiziente Gasheizungen für Ihr Zuhause. Brennwerttechnik für maximale Effizienz.",
  },
  {
    icon: Leaf,
    title: "Hybridheizung",
    description:
      "Kombinieren Sie verschiedene Energiequellen für maximale Flexibilität und Umweltfreundlichkeit.",
  },
  {
    icon: Settings,
    title: "Kesselwartung",
    description:
      "Regelmäßige Wartung sorgt für Langlebigkeit und optimale Funktion Ihrer Heizungsanlage.",
  },
];

const features = [
  "Neuanlagenbau und Installation",
  "Heizungssanierung & -reparaturen",
  "Kesselumstellung (Öl auf Gas)",
  "Energieeffiziente Heizungsanlagen",
  "Brennwerttechnik",
  "Fernwartung via Vitoconnect",
];

export default function HeizungPage() {
  return (
    <>
      {/* Hero Section - Van Style */}
      <section className="bg-navy-section text-white py-20 md:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-flame-500/10 rounded-full blur-[100px]" />
          {/* Diagonal accent lines */}
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="50" x2="1440" y2="100" stroke="#ff6600" strokeWidth="2" opacity="0.2" />
            <line x1="0" y1="350" x2="1440" y2="300" stroke="#ff6600" strokeWidth="2" opacity="0.2" />
          </svg>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-accent-500 to-flame-500 p-3 rounded-xl shadow-lg glow-flame">
                <Flame className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-8 bg-accent-500 rounded-full" />
                <span className="text-accent-400 font-semibold uppercase tracking-wider text-sm">
                  Unsere Leistungen
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Heizung & <span className="gradient-text-flame">Haustechnik</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Ob Ölheizung, Gasheizung oder Hybridheizung – wir sind Ihr kompetenter 
              Partner für moderne Heizsysteme. Von der Planung über die Installation 
              bis zur regelmäßigen Wartung.
            </p>
          </div>
        </div>
        
        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80", title: "Wärmepumpen" },
              { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", title: "Heizungsanlagen" },
              { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", title: "Brennwerttechnik" },
            ].map((item, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-1 bg-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-bold text-lg">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1 w-12 bg-accent-500 rounded-full" />
              <span className="text-accent-600 font-semibold uppercase tracking-wider text-sm">
                Services
              </span>
              <span className="h-1 w-12 bg-flame-400 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Unsere Heizungs-Services
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-accent-500 group-hover:h-full transition-all duration-500" />
                <div className="bg-accent-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-500 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-accent-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-0.5 w-8 bg-accent-500 rounded-full" />
                <span className="text-accent-600 font-semibold uppercase tracking-wider text-sm">
                  Leistungen
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Unser Service im Überblick
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Wir kümmern uns um alle Bereiche rund um Ihre Heizungsanlage. 
                Ob Neuinstallation, Modernisierung oder Reparatur – unsere 
                erfahrenen Fachleute sind für Sie da.
              </p>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-50 transition-colors">
                    <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-100/50 to-flame-50/50 rounded-3xl -rotate-2" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Unsere Partner
                </h3>
                <p className="text-gray-600 mb-6">
                  Als zertifizierter Fachbetrieb arbeiten wir mit führenden 
                  Herstellern zusammen, um Ihnen die beste Qualität zu bieten.
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900">Viessmann</h4>
                    <p className="text-sm text-gray-600">
                      Premium-Heizsysteme und Fernwartungslösungen
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-gray-900">Brötje</h4>
                    <p className="text-sm text-gray-600">
                      Zuverlässige Heizkessel und Wärmepumpen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="bg-navy-section rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-flame-500/10 rounded-full blur-[80px]" />
              <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="50" x2="1000" y2="80" stroke="#ff6600" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="350" x2="1000" y2="320" stroke="#ffcc00" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
            
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Heizung modernisieren?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Lassen Sie sich unverbindlich beraten. Wir informieren Sie auch 
                über aktuelle Fördermöglichkeiten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Beratung anfragen
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="tel:05731-28226"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-lg font-bold transition-colors border-2 border-white/20"
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
