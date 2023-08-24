import { Nav } from "@/components/admin/Nav";
import "../../styles/globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { Metadata } from "next";
import { Inter, Familjen_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const heading = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: { default: "Admin | Yalography", template: "%s | Yalography" },
  icons: { icon: "/logo.png" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark dark-mode ${inter.variable} ${heading.variable}`}>
      <body className="  dark:bg-neutral-900  text-gray-700 dark:text-gray-100 duration-200 ease-out">
        <ToastProvider />
        <Nav />
        <main className="w-6/6 ml-auto p-5">{children}</main>
      </body>
    </html>
  );
}
