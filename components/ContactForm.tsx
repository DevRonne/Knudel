"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate form submission
    // In production, you would send this to your API or email service
    try {
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Log the form data (in production, send to API)
      console.log("Form submitted:", formData);
      
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-500 focus:border-water-500 transition-colors"
            placeholder="Ihr Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-Mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-500 focus:border-water-500 transition-colors"
            placeholder="ihre@email.de"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-500 focus:border-water-500 transition-colors"
            placeholder="Ihre Telefonnummer"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Betreff *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-500 focus:border-water-500 transition-colors"
          >
            <option value="">Bitte wählen...</option>
            <option value="heizung">Heizung & Haustechnik</option>
            <option value="sanitaer">Bäder & Sanitär</option>
            <option value="wartung">Wartung</option>
            <option value="reparatur">Reparatur / Notfall</option>
            <option value="beratung">Allgemeine Beratung</option>
            <option value="sonstiges">Sonstiges</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-water-500 focus:border-water-500 transition-colors resize-none"
          placeholder="Beschreiben Sie Ihr Anliegen..."
        />
      </div>

      {status === "success" && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <p>Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder rufen Sie uns an.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
      >
        {status === "loading" ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Wird gesendet...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Nachricht senden
          </>
        )}
      </button>
    </form>
  );
}
