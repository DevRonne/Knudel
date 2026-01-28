import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features?: string[];
  variant?: "default" | "water" | "heat";
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  href,
  features,
  variant = "default",
}: ServiceCardProps) {
  const variantStyles = {
    default: {
      iconBg: "bg-primary-100 group-hover:bg-primary-800",
      iconColor: "text-primary-700 group-hover:text-white",
      accentColor: "bg-primary-500",
      borderHover: "group-hover:border-primary-300",
      splash: "from-primary-500/20 to-transparent",
    },
    water: {
      iconBg: "bg-water-100 group-hover:bg-water-600",
      iconColor: "text-water-600 group-hover:text-white",
      accentColor: "bg-water-500",
      borderHover: "group-hover:border-water-300",
      splash: "from-water-500/20 to-transparent",
    },
    heat: {
      iconBg: "bg-accent-100 group-hover:bg-accent-600",
      iconColor: "text-accent-600 group-hover:text-white",
      accentColor: "bg-accent-500",
      borderHover: "group-hover:border-accent-300",
      splash: "from-accent-500/20 to-transparent",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 group hover:-translate-y-2 overflow-hidden ${styles.borderHover}`}>
      {/* Splash accent in corner */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-radial ${styles.splash} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Decorative line */}
      <div className={`absolute top-0 left-0 w-1 h-0 ${styles.accentColor} group-hover:h-full transition-all duration-500`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${styles.iconBg} group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className={`h-7 w-7 transition-colors duration-300 ${styles.iconColor}`} />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-800 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {features && (
          <ul className="space-y-2 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`w-2 h-2 ${styles.accentColor} rounded-full`}></span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-900 font-semibold group-hover:gap-3 transition-all"
        >
          Mehr erfahren
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
