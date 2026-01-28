interface DiagonalDividerProps {
  className?: string;
  variant?: "navy-to-white" | "white-to-navy" | "navy-to-gray" | "gray-to-navy";
  height?: "sm" | "md" | "lg";
  withSplash?: boolean;
}

export default function DiagonalDivider({ 
  className = "", 
  variant = "navy-to-white",
  height = "md",
  withSplash = false
}: DiagonalDividerProps) {
  const heights = {
    sm: "h-16",
    md: "h-24",
    lg: "h-32",
  };

  const colors = {
    "navy-to-white": { from: "#0f1a2b", to: "#ffffff" },
    "white-to-navy": { from: "#ffffff", to: "#0f1a2b" },
    "navy-to-gray": { from: "#0f1a2b", to: "#f9fafb" },
    "gray-to-navy": { from: "#f9fafb", to: "#0f1a2b" },
  };

  const { from, to } = colors[variant];

  return (
    <div className={`relative w-full ${heights[height]} ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`diagonalGrad-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        
        {/* Diagonal shape */}
        <polygon
          points="0,0 1440,0 1440,30 0,100"
          fill={from}
        />
        <polygon
          points="0,100 1440,30 1440,100"
          fill={to}
        />
        
        {/* Optional water splash accent */}
        {withSplash && (
          <>
            <path
              d="M200 50 Q250 30 300 50 Q350 70 400 45"
              stroke="#00b4d8"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
            />
            <circle cx="220" cy="45" r="4" fill="#00b4d8" opacity="0.5" />
            <circle cx="380" cy="50" r="3" fill="#0099cc" opacity="0.4" />
          </>
        )}
      </svg>
    </div>
  );
}

export function DiagonalBanner({ 
  className = "",
  children 
}: { 
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Diagonal navy stripe */}
      <div 
        className="absolute inset-0 bg-primary-800"
        style={{
          clipPath: "polygon(0 20%, 100% 0%, 100% 80%, 0% 100%)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function DiagonalStripe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      className={`w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="stripeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f1a2b" />
          <stop offset="50%" stopColor="#1e3250" />
          <stop offset="100%" stopColor="#0f1a2b" />
        </linearGradient>
      </defs>
      
      {/* Main diagonal stripe */}
      <polygon
        points="0,60 1440,20 1440,140 0,180"
        fill="url(#stripeGradient)"
      />
      
      {/* Accent line */}
      <line
        x1="0" y1="65"
        x2="1440" y2="25"
        stroke="#00b4d8"
        strokeWidth="2"
        opacity="0.5"
      />
      <line
        x1="0" y1="175"
        x2="1440" y2="135"
        stroke="#ff6600"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}
