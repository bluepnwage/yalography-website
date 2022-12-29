import "../styles/globals.css";
import { Footer } from "@components/Footer";
import { Header } from "@components/Navbar";
import { ScrollToTop } from "@components/ScrollToTop";

type PropTypes = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: PropTypes) {
  return (
    <html lang="en" className="font-sans dark dark-mode">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={"/logo.png"} type={"image/png"} />
        <title>SXM Photography | Yalography</title>
        <link
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900"
          rel="stylesheet"
        />
      </head>

      <body className="dark:bg-zinc-900 bg-gray-100 text-gray-900 dark:text-gray-300 duration-200 ease-out">
        <ScrollToTop />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
