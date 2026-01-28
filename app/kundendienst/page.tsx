import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Wrench,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Phone,
  ArrowRight,
  Building2,
  Home,
  Wifi,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kundendienst | Knudel Haustechnik",
  description:
    "Schneller und zuverlässiger Kundendienst für Heizung und Sanitär. Service, Wartung und Notfall-Reparaturen für Privat und Industrie.",
};

const services = [
  {
    icon: Clock,
    title: "Schnelle Hilfe",
    description:
      "Bei Störungen und Notfällen sind wir schnell für Sie da. Heizungsausfall oder Rohrbruch? Rufen Sie uns an!",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Regelmäßige Wartung",
    description:
      "Vorbeugen ist besser als Reparieren. Regelmäßige Wartung sichert die Langlebigkeit Ihrer Anlagen.",
    color: "water",
  },
  {
    icon: Home,
    title: "Service für Privat",
    description:
      "Ob Einfamilienhaus oder Wohnung – wir kümmern uns um Ihre Heizung und sanitären Anlagen.",
    color: "accent",
  },
  {
    icon: Building2,
    title: "Service für Industrie",
    description:
      "Auch gewerbliche Kunden profitieren von unserem zuverlässigen Service und unserer Expertise.",
    color: "water",
  },
];

const wartungsleistungen = [
  "Heizungswartung und -prüfung",
  "Kesselreinigung",
  "Brennereinstellung",
  "Abgasmessung",
  "Dichtheitsprüfung",
  "Sicherheitscheck",
];

const reparaturleistungen = [
  "Heizungsreparatur",
  "Rohrbruchbehebung",
  "Wasserschadenbeseitigung",
  "Pumpenausfall beheben",
  "Thermostat-Austausch",
  "Mängelbeseitigung",
];

export default function KundendienstPage() {
  return (
    <>
      {/* Hero Section - Van Style */}
      <section className="bg-navy-section text-white py-20 md:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-water-500/10 rounded-full blur-[100px]" />
          <svg
            viewBox="0 0 1440 400"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="50" x2="1440" y2="100" stroke="#00b4d8" strokeWidth="2" opacity="0.2" />
            <line x1="0" y1="350" x2="1440" y2="300" stroke="#ff6600" strokeWidth="2" opacity="0.2" />
          </svg>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-700 to-primary-800 p-3 rounded-xl shadow-lg border border-primary-600">
                <Wrench className="h-7 w-7" />
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-8 bg-water-500 rounded-full" />
                <span className="text-water-400 font-semibold uppercase tracking-wider text-sm">
                  Unsere Leistungen
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Kundendienst
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Schneller und zuverlässiger Service für Privat und Industrie. 
              Ob Wartung, Reparatur oder Notfall – wir sind für Sie da.
            </p>
          </div>
        </div>
        
        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="#ef4444" />
          </svg>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gradient-to-r from-accent-500 via-accent-600 to-accent-500 text-white py-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-flame-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-7 w-7 animate-pulse" />
              <span className="font-bold text-xl">Heizungsausfall oder Rohrbruch?</span>
            </div>
            <a
              href="tel:05731-28226"
              className="inline-flex items-center gap-2 bg-white text-accent-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Jetzt anrufen: 05731 - 28 226
            </a>
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80", title: "Professioneller Service", subtitle: "Kompetente Fachleute für Ihre Haustechnik" },
              { src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", title: "Wartung & Reparatur", subtitle: "Schnelle Hilfe bei Störungen" },
            ].map((item, index) => (
              <div key={index} className="relative aspect-[16/10] rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-950/20 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-water-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-white font-bold text-xl">{item.title}</span>
                  <p className="text-gray-300 text-sm mt-1">{item.subtitle}</p>
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
              <span className="h-1 w-12 bg-accent-500 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Unser Kundendienst
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-1 h-0 ${service.color === 'water' ? 'bg-water-500' : 'bg-accent-500'} group-hover:h-full transition-all duration-500`} />
                <div className={`${service.color === 'water' ? 'bg-water-100' : 'bg-accent-100'} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ${service.color === 'water' ? 'group-hover:bg-water-500' : 'group-hover:bg-accent-500'}`}>
                  <service.icon className={`h-7 w-7 ${service.color === 'water' ? 'text-water-600' : 'text-accent-600'} group-hover:text-white transition-colors`} />
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

      {/* Wartung & Reparatur */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1 w-12 bg-water-500 rounded-full" />
              <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                Leistungen
              </span>
              <span className="h-1 w-12 bg-accent-500 rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Wartung & Reparatur
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-water-100/50 to-primary-50/50 rounded-3xl -rotate-1" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-water-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-water-600" />
                  </div>
                  Wartungsleistungen
                </h3>
                <ul className="space-y-3">
                  {wartungsleistungen.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-water-50 transition-colors">
                      <CheckCircle className="h-5 w-5 text-water-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-100/50 to-flame-50/50 rounded-3xl rotate-1" />
              <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-accent-600" />
                  </div>
                  Reparaturleistungen
                </h3>
                <ul className="space-y-3">
                  {reparaturleistungen.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent-50 transition-colors">
                      <CheckCircle className="h-5 w-5 text-accent-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fernwartung */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-water-500/5 rounded-full blur-[80px]" />
            
            <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="h-0.5 w-8 bg-water-500 rounded-full" />
                  <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                    Smart Service
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Fernüberwachung & Fernwartung
                </h2>
                <p className="text-gray-600 mb-6">
                  Mit dem Vitoconnect 100 System können wir Ihre Heizungsanlage 
                  aus der Ferne überwachen. Störungen werden frühzeitig erkannt 
                  und oft behoben, bevor Sie es bemerken.
                </p>
                <ul className="space-y-3">
                  {[
                    "24/7 Überwachung Ihrer Anlage",
                    "Frühzeitige Störungserkennung",
                    "Optimierung der Betriebsparameter",
                    "Steuerung per Smartphone-App",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-water-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-primary-50 to-water-50 rounded-xl shadow-lg p-8 inline-block border border-gray-100">
                  <div className="w-16 h-16 bg-water-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Wifi className="h-8 w-8 text-water-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-xl mb-2">VITOCONNECT 100</h4>
                  <p className="text-sm text-gray-600 mb-4 max-w-xs">
                    Kommunikations-Schnittstelle zur Fernüberwachung und 
                    Fernbedienung von Heizungsanlagen.
                  </p>
                  <a
                    href="https://www.viessmann.de/de/viessmann-apps/vitoconnect.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-water-600 hover:text-water-700 font-semibold text-sm"
                  >
                    Mehr auf viessmann.de
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-navy-section text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-water-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />
          <svg viewBox="0 0 1440 400" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50" x2="1440" y2="80" stroke="#00b4d8" strokeWidth="1" opacity="0.2" />
            <line x1="0" y1="350" x2="1440" y2="320" stroke="#ff6600" strokeWidth="1" opacity="0.2" />
          </svg>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kundendienst anfragen
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Vereinbaren Sie einen Termin für Wartung oder Reparatur. 
              Wir melden uns schnellstmöglich bei Ihnen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Termin vereinbaren
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
      </section>
    </>
  );
}
