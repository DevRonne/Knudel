import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Knudel Haustechnik | Heizung & Sanitär in Bad Oeynhausen und Löhne",
  description:
    "Ihr kompetenter Partner für Heizung, Sanitär und Haustechnik. Wartung, Reparatur und Neuinstallation von Heizungsanlagen. Service in Bad Oeynhausen und Löhne.",
  keywords: [
    "Heizung",
    "Sanitär",
    "Bad Oeynhausen",
    "Löhne",
    "Haustechnik",
    "Gasheizung",
    "Ölheizung",
    "Wartung",
    "Reparatur",
  ],
  openGraph: {
    title: "Knudel Haustechnik | Heizung & Sanitär",
    description: "Ihr kompetenter Partner für Heizung und Sanitär in Bad Oeynhausen und Löhne.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
