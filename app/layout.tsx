import { Footer } from "@components/Footer";
import { Header } from "@components/Navbar";
import { Poppins as FontSans } from "@next/font/google";

import "../styles/globals.css";

const font = FontSans({ weight: "500" });

export default function RootLayout({ children }: ComponentProps) {
  return (
    <html lang="en" className={`${font.className}`}>
      <head>
        <title>SXM Photography | Yalography</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-zinc-900 text-gray-300">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
