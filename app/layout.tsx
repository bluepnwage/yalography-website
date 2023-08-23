import "../styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Suspense } from "react";
import { ToastProvider } from "@/components/ToastProvider";
import { Metadata } from "next";
import { Inter, Familjen_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heading = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

type PropTypes = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: { default: "SXM Photography | Yalography", template: "%s | Yalography" },
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }: PropTypes) {
  return (
    <html lang="en" className={`dark dark-mode ${inter.variable} ${heading.variable}`}>
      <head />
      <body className="dark:bg-neutral-900  text-gray-700 dark:text-gray-100 duration-200 ease-out">
        <Suspense fallback={null}>
          <ToastProvider />
          <ScrollToTop />
        </Suspense>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
