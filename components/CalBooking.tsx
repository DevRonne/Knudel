"use client";

import { useEffect } from "react";

interface CalBookingProps {
  calLink?: string;
}

export default function CalBooking({ calLink = "knudel-haustechnik/termin" }: CalBookingProps) {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://app.cal.com/embed/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Online Termin buchen
      </h3>
      <p className="text-gray-600 mb-6">
        Buchen Sie direkt einen passenden Termin in unserem Kalender.
      </p>
      
      {/* Cal.com inline embed */}
      <div
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        className="min-h-[500px] bg-gray-50 rounded-lg"
      >
        {/* Fallback content while Cal.com loads */}
        <div className="flex items-center justify-center h-full min-h-[500px] text-gray-500">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Kalender wird geladen...</p>
            <p className="text-sm mt-2">
              Falls der Kalender nicht lädt, rufen Sie uns bitte an.
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        <strong>Hinweis:</strong> Für die Terminbuchung wird Cal.com verwendet. 
        Nach der Buchung erhalten Sie eine Bestätigungs-E-Mail.
      </p>
    </div>
  );
}
