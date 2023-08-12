import "./globals.css";
import { Open_Sans } from "next/font/google";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "NX - Boostez votre carriere de developpeur avec des cours en ligne modernes.",
  description: "Améliorez vos compétences en ingénierie informatique avec des cours modernes et complets.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
