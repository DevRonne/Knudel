// Clean, modern gradient backgrounds instead of complex splashes

interface WaterSplashProps {
  className?: string;
  opacity?: number;
}

export function WaterSplashLeft({ className = "", opacity = 1 }: WaterSplashProps) {
  return (
    <div 
      className={`absolute left-0 top-0 h-full w-1/3 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* Subtle cyan gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-water-500/20 via-water-400/10 to-transparent" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-water-500/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-10 w-60 h-60 bg-water-400/10 rounded-full blur-[80px]" />
    </div>
  );
}

export function WaterSplashRight({ className = "", opacity = 1 }: WaterSplashProps) {
  return (
    <div 
      className={`absolute right-0 top-0 h-full w-1/3 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {/* Subtle orange gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-l from-accent-500/15 via-accent-400/5 to-transparent" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-accent-500/15 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -right-10 w-60 h-60 bg-flame-400/10 rounded-full blur-[80px]" />
    </div>
  );
}

export function WaterSplashDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`h-1 w-24 bg-gradient-to-r from-water-500 to-water-400 rounded-full ${className}`} />
  );
}
