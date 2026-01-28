import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import CalBooking from "@/components/CalBooking";
import { Phone, Mail, MapPin, Clock, Calendar, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt | Knudel Haustechnik",
  description:
    "Kontaktieren Sie uns für Heizung, Sanitär und Haustechnik. Termin buchen, Beratung anfragen oder Notfall melden.",
};

export default function KontaktPage() {
  return (
    <>
      {/* Hero Section - Van Style */}
      <section className="bg-navy-section text-white py-20 md:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-water-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />
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
            <div className="flex items-center gap-2 mb-4">
              <span className="h-0.5 w-8 bg-water-500 rounded-full" />
              <span className="text-water-400 font-semibold uppercase tracking-wider text-sm">
                Kontaktieren Sie uns
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Kontakt
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
              Wir freuen uns auf Ihre Nachricht!
            </p>
          </div>
        </div>
        
        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16">
            <defs>
              <linearGradient id="contactWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#ff6600" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00b4d8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0 60 Q360 20 720 60 Q1080 100 1440 60 L1440 80 L0 80 Z" fill="url(#contactWave)" />
            <path d="M0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 L0 80 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: "Telefon", content: "05731 / 28 22 6", href: "tel:05731-28226", color: "accent" },
              { icon: Mail, title: "E-Mail", content: "info@knudel-gmbh.de", href: "mailto:info@knudel-gmbh.de", color: "water" },
              { icon: MapPin, title: "Adresse", content: "Koblenzer Str. 34\n32584 Löhne", href: null, color: "primary" },
              { icon: Clock, title: "Bürozeiten", content: "Mo - Fr: 08:00 - 17:00\nSa: nach Vereinbarung", href: null, color: "primary" },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1 group border border-gray-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${item.color === 'water' ? 'bg-water-500' : item.color === 'accent' ? 'bg-accent-500' : 'bg-primary-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                <div className={`${item.color === 'water' ? 'bg-water-100' : item.color === 'accent' ? 'bg-accent-100' : 'bg-primary-100'} w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`h-7 w-7 ${item.color === 'water' ? 'text-water-600' : item.color === 'accent' ? 'text-accent-600' : 'text-primary-700'}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-primary-700 hover:text-primary-800 font-semibold whitespace-pre-line"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600 text-sm whitespace-pre-line">{item.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-water-500" />
                <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                  Nachricht
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Schreiben Sie uns
              </h2>
              <p className="text-gray-600 mb-8">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich 
                bei Ihnen. Bei dringenden Anliegen rufen Sie uns bitte direkt an.
              </p>
              <ContactForm />
            </div>

            {/* Cal.com Booking */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-accent-500" />
                <span className="text-accent-600 font-semibold uppercase tracking-wider text-sm">
                  Terminbuchung
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Termin vereinbaren
              </h2>
              <p className="text-gray-600 mb-8">
                Buchen Sie direkt einen passenden Termin für Beratung, 
                Wartung oder Reparatur.
              </p>
              <CalBooking calLink="knudel-haustechnik/termin" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-1 w-12 bg-water-500 rounded-full" />
              <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
                Standort
              </span>
              <span className="h-1 w-12 bg-accent-500 rounded-full" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              So finden Sie uns
            </h2>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.8!2d8.7!3d52.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDEyJzAwLjAiTiA4wrA0MicwMC4wIkU!5e0!3m2!1sde!2sde!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort Knudel Haustechnik"
              className="w-full"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://www.google.com/maps/dir//Koblenzer+Str.+34,+32584+L%C3%B6hne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-800 hover:bg-primary-900 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-md"
            >
              <MapPin className="h-5 w-5" />
              Route planen
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
