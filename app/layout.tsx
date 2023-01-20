import "../styles/globals.css";
import { Footer } from "@components/Footer";
import { Header } from "@components/Navbar";
import { ScrollToTop } from "@components/ScrollToTop";
import { Suspense } from "react";
import { ToastProvider } from "@components/ToastProvider";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter"
});

type PropTypes = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: PropTypes) {
  return (
    <html lang="en" className={`dark dark-mode ${inter.variable}`}>
      <body className="dark:bg-zinc-900 bg-gray-100 text-gray-900 dark:text-gray-300 duration-200 ease-out">
        <Suspense fallback={null}>
          <ToastProvider />
          <ScrollToTop />
        </Suspense>
        <Header  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
