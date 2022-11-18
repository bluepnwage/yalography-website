import { Footer } from "@components/Footer";
import { Header } from "@components/Navbar";
import { Kumbh_Sans as FontSans } from "@next/font/google";

import "../styles/globals.css";

const kumbhSans = FontSans({ variable: "--font-kumbh-sans", subsets: ["latin"] });

export default function RootLayout({ children }: ComponentProps) {
  return (
    <html lang="en" className={`${kumbhSans.className}`}>
      <head>
        <title>SXM Photography | Yalography</title>
      </head>
      <body className="bg-zinc-900 text-gray-300">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
