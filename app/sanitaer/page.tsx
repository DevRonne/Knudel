import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  Bath,
  Waves,
  Pipette,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bäder & Sanitär | Knudel Haustechnik",
  description:
    "Komplette Badplanung und -sanierung. Sanitärinstallationen, Enthärtungsanlagen und mehr. Ihr Fachbetrieb in Bad Oeynhausen und Löhne.",
};

const services = [
  {
    icon: Bath,
    title: "Badsanierung",
    description:
      "Komplette Renovierung Ihres Badezimmers – von der Planung bis zur Fertigstellung aus einer Hand.",
  },
  {
    icon: Droplets,
    title: "Sanitärinstallation",
    description:
      "Fachgerechte Installation aller sanitären Anlagen. Wasserleitungen, Abwasser und mehr.",
  },
  {
    icon: Waves,
    title: "Enthärtungsanlagen",
    description:
      "Schützen Sie Ihre Leitungen und Geräte vor Kalk mit professionellen Enthärtungsanlagen von Grünbeck.",
  },
  {
    icon: Pipette,
    title: "Wasserschadensanierung",
    description:
      "Schnelle Hilfe bei Wasserschäden. Rohrbruchbehebung und Instandsetzung.",
  },
];

const features = [
  "Badsanierung & Modernisierung",
  "Barrierefreie Badgestaltung",
  "Sanitäre Neuinstallationen",
  "Rohrbruchbehebung",
  "Wasserschadenbeseitigung",
  "Enthärtungsanlagen von Grünbeck",
  "Druckprobleme beheben",
  "Feuchte Wände und Keller",
];

export default function SanitaerPage() {
  return (
    <>
      {/* Hero Section - Van Style */}
      <section className="bg-navy-section text-white py-20 md:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-water-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-water-400/10 rounded-full blur-[100px]" />
          {/* Diagonal accent lines */}
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="50" x2="1440" y2="100" stroke="#00b4d8" strokeWidth="2" opacity="0.2" />
            <line x1="0" y1="350" x2="1440" y2="300" stroke="#00b4d8" strokeWidth="2" opacity="0.2" />
          </svg>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-water-500 to-water-600 p-3 rounded-xl shadow-lg glow-water">
                <Droplets className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-8 bg-water-500 rounded-full" />
                <span className="text-water-400 font-semibold uppercase tracking-wider text-sm">
                  Unsere Leistungen
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Bäder & <span className="gradient-text-water">Sanitär</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Vom Wasserhahn bis zur kompletten Badsanierung – wir sind Ihr 
              zuverlässiger Partner für alle sanitären Installationen und 
              Reparaturen.
            </p>
          </div>
        </div>
        
        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#0077b6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#00b4d8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0 60 Q360 20 720 60 Q1080 100 1440 60 L1440 80 L0 80 Z" fill="url(#waveGradient)" />
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80", title: "Badsanierung" },
              { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80", title: "Sanitärinstallation" },
              { src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80", title: "Design-Bäder" },
            ].map((item, index) => (
              <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-1 bg-water-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
              <span className="h-1 w-12 bg-water-500 rounded-full" />
              <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                Services
              </span>
              <span className="h-1 w-12 bg-water-400 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Unsere Sanitär-Services
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-water-500 group-hover:h-full transition-all duration-500" />
                <div className="bg-water-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-water-500 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-7 w-7 text-water-600 group-hover:text-white transition-colors" />
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
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-water-100/50 to-primary-50/50 rounded-3xl rotate-2" />
                <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-water-100 rounded-xl flex items-center justify-center">
                      <Waves className="h-6 w-6 text-water-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Enthärtungsanlagen
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Hartes Wasser kann Ihre Leitungen und Haushaltsgeräte beschädigen. 
                    Mit Enthärtungsanlagen von Grünbeck schützen Sie Ihr Zuhause und 
                    genießen weiches Wasser.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Schutz vor Kalkablagerungen",
                      "Längere Lebensdauer der Geräte",
                      "Weniger Reinigungsaufwand",
                      "Angenehmes Hautgefühl",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-water-500" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-0.5 w-8 bg-water-500 rounded-full" />
                <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                  Leistungen
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Wir helfen bei
              </h2>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-water-50 transition-colors">
                    <CheckCircle className="h-5 w-5 text-water-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
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
              <div className="absolute top-0 right-0 w-80 h-80 bg-water-500/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-water-400/10 rounded-full blur-[80px]" />
              <svg viewBox="0 0 1000 400" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="50" x2="1000" y2="80" stroke="#00b4d8" strokeWidth="2" opacity="0.3" />
                <line x1="0" y1="350" x2="1000" y2="320" stroke="#0077b6" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
            
            <div className="max-w-2xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bad renovieren oder Sanitärproblem?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Kontaktieren Sie uns für eine unverbindliche Beratung oder 
                schnelle Hilfe bei Notfällen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-water-500 to-water-600 hover:from-water-600 hover:to-water-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
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
