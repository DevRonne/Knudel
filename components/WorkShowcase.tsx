import Image from "next/image";
import Link from "next/link";

const showcaseItems = [
  {
    title: "Wärmepumpe",
    description: "Moderne und effiziente Wärmepumpensysteme für Ihr Zuhause",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    href: "/heizung",
    category: "Heizung",
    accent: "accent",
  },
  {
    title: "Badsanierung",
    description: "Komplette Badsanierung vom ersten Entwurf bis zur Fertigstellung",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    href: "/sanitaer",
    category: "Sanitär",
    accent: "water",
  },
  {
    title: "Heizungsanlage",
    description: "Professionelle Installation und Wartung von Heizungsanlagen",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    href: "/heizung",
    category: "Heizung",
    accent: "accent",
  },
  {
    title: "Sanitärinstallation",
    description: "Fachgerechte Sanitärinstallationen für Neubau und Renovierung",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    href: "/sanitaer",
    category: "Sanitär",
    accent: "water",
  },
];

export default function WorkShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-water-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-1 w-12 bg-water-500 rounded-full" />
            <span className="text-water-600 font-semibold uppercase tracking-wider text-sm">
              Referenzen
            </span>
            <span className="h-1 w-12 bg-accent-500 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unsere Arbeit
          </h2>
          <p className="text-gray-600 text-lg">
            Einblicke in unsere Projekte und Leistungen. Qualität und 
            Zuverlässigkeit, auf die Sie sich verlassen können.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-gray-100 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/30 to-transparent" />
              
              {/* Accent line on hover */}
              <div className={`absolute top-0 left-0 w-full h-1 ${item.accent === 'water' ? 'bg-water-500' : 'bg-accent-500'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className={`text-xs font-bold uppercase tracking-wider ${item.accent === 'water' ? 'text-water-400' : 'text-accent-400'}`}>
                  {item.category}
                </span>
                <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-water-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
