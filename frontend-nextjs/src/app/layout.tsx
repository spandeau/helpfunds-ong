import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "HelpFunds",
  description: "Construisons un avenir meilleur",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}