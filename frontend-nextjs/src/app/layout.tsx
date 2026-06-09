import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "Help Funds — ONG Internationale",
    template: "%s — Help Funds",
  },
  description: "Help Funds est une ONG internationale qui finance des projets humanitaires dans 35 pays. Education, sante, eau potable, alimentation.",
  keywords: ["ONG", "humanitaire", "don", "aide", "Afrique", "projets", "Help Funds"],
  authors: [{ name: "Help Funds" }],
  creator: "Help Funds",
  metadataBase: new URL("https://helpfunds-ong-3bzx.vercel.app"),
  openGraph: {
    title: "Help Funds — ONG Internationale",
    description: "Soutenez nos projets humanitaires dans 35 pays.",
    url: "https://helpfunds-ong-3bzx.vercel.app",
    siteName: "Help Funds",
    images: [{ url: "/logo.png", width: 400, height: 200, alt: "Help Funds" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Funds — ONG Internationale",
    description: "Soutenez nos projets humanitaires dans 35 pays.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}