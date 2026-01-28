interface PartnersProps {
  showHandwerkspartner?: boolean;
  compact?: boolean;
}

const vertriebspartner = [
  { name: "Viessmann", color: "#e4002b" },
  { name: "Junkers", color: "#003366" },
  { name: "Bosch", color: "#e20015" },
  { name: "Brötje", color: "#c41230" },
];

const handwerkspartner = [
  { name: "BK Service", color: "#0077b6" },
  { name: "Daniele d'Amuri", color: "#2563eb" },
];

export default function Partners({ showHandwerkspartner = true, compact = false }: PartnersProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6">
        {vertriebspartner.map((partner) => (
          <div
            key={partner.name}
            className="text-sm font-semibold text-gray-400 hover:text-gray-300 transition-colors"
          >
            {partner.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-water-500/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px] -translate-y-1/2" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-1 w-12 bg-water-500 rounded-full" />
            <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
              Starke Partner
            </span>
            <span className="h-1 w-12 bg-accent-500 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Unsere Partner
          </h2>
        </div>

        {/* Vertriebspartner */}
        <div className="mb-12">
          <h3 className="text-water-600 text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-8 h-0.5 bg-water-500 rounded-full" />
            Vertriebspartner
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {vertriebspartner.map((partner) => (
              <div
                key={partner.name}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center h-24 border border-gray-100 group"
              >
                <span
                  className="text-xl md:text-2xl font-bold tracking-tight group-hover:scale-105 transition-transform"
                  style={{ color: partner.color }}
                >
                  {partner.name === "Viessmann" ? (
                    <span className="flex items-center">
                      VIE<span className="text-[#00a651]">S</span>SMANN
                    </span>
                  ) : partner.name === "Junkers" ? (
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                      </svg>
                      JUNKERS
                    </span>
                  ) : partner.name === "Bosch" ? (
                    <span className="flex items-center gap-1">
                      <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">B</span>
                      BOSCH
                    </span>
                  ) : (
                    <span>
                      BRÖTJE
                      <span className="block text-xs font-normal text-gray-500 mt-1">HEIZUNG</span>
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Handwerkspartner */}
        {showHandwerkspartner && (
          <div>
            <h3 className="text-accent-600 text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent-500 rounded-full" />
              Handwerkspartner
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {handwerkspartner.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center h-24 border border-gray-100 group"
                >
                  <span
                    className="text-xl font-bold group-hover:scale-105 transition-transform"
                    style={{ color: partner.color }}
                  >
                    {partner.name === "BK Service" ? (
                      <span className="flex items-center gap-2">
                        <span className="bg-yellow-400 text-blue-900 px-2 py-1 rounded text-sm font-black">BK</span>
                        <span>Service</span>
                      </span>
                    ) : (
                      <span className="flex flex-col items-center">
                        <span>Daniele d'Amuri</span>
                        <span className="text-xs font-normal text-gray-500 mt-1">
                          Fliesenleger · Trockenbau · Bad Sanierung
                        </span>
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
