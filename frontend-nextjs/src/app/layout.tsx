import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "HelpFunds",
  description: "Construisons un avenir meilleur",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}