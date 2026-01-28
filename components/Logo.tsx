import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 40 },
    md: { width: 40, height: 50 },
    lg: { width: 56, height: 70 },
    xl: { width: 80, height: 100 },
    "2xl": { width: 112, height: 140 },
  };

  const { width, height } = sizes[size];

  return (
    <Image
      src="/images/knudel-logo.png"
      alt="Knudel Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
