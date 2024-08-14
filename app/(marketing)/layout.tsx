import "../../styles/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Navbar";
import { Suspense } from "react";
import { ToastProvider } from "@/components/ToastProvider";
import { Metadata } from "next";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { NextThemesProvider } from "@/components/next-themes-provider";
import { Toaster } from "sonner";
import { BookingSessionProvider } from "@/components/book-session/book-session-provider";
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
    <html
      suppressHydrationWarning
      lang="en"
      className={`dark dark-mode ${inter.variable} ${heading.variable}`}
    >
      <head />
      <body className="dark:bg-neutral-900  text-gray-700 dark:text-gray-100 duration-200 ease-out">
        <Suspense fallback={null}>
          <Toaster
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "bg-white dark:bg-neutral-900 p-4 w-[356px] flex gap-[6px] items-center ring-1 ring-neutral-100 dark:ring-neutral-800 rounded",
                success: "text-success-600 dark:text-success-500",
                title: "text-gray-800 dark:text-gray-100",
                description: "text-gray-700 dark:text-gray-200",
                error: "text-error-600 dark:text-error-500"
              }
            }}
          />
          <ToastProvider />
        </Suspense>
        <NextThemesProvider attribute="class">
          <BookingSessionProvider>
            <Header />
            {children}
            <Footer />
          </BookingSessionProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
