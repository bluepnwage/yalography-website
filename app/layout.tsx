import "../styles/globals.css";
import { Footer } from "@components/Footer";
import { Header } from "@components/Navbar";
import { ScrollToTop } from "@components/ScrollToTop";
import { Suspense } from "react";
import { ToastProvider } from "@components/ToastProvider";
import { Metadata } from "next";
import { Inter as Font } from "next/font/google";

const inter = Font({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter"
});

type PropTypes = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: { default: "SXM Photography | Yalography", template: "%s | Yalography" },
  icons: { icon: "/logo.png" }
};

export default function RootLayout({ children }: PropTypes) {
  return (
    <html lang="en" className={`dark dark-mode ${inter.variable}`}>
      <head />
      <body className="dark:bg-zinc-900 bg-gray-100 text-gray-900 dark:text-gray-300 duration-200 ease-out">
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
