import "../styles/globals.css";
import notFound from "@public/404.jpg";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900"
          rel="stylesheet"
        />
      </Head>
      <div className="h-screen bg-zinc-900 text-gray-100 ">
        <div className="grid grid-cols-2 h-full">
          <div className="flex justify-center px-10 flex-col">
            <p className="text-red-500 font-bold mb-2 text-lg">404</p>
            <h1 className="font-sans text-6xl font-bold mb-4">Page not found</h1>
            <p className="text-gray-400 mb-10">Sorry, we couldn&apos;t find the page you were looking for.</p>
            <Link href={"/"} className="text-yellow-400">
              Go back to home →
            </Link>
          </div>
          <figure className="overflow-hidden object-cover h-full">
            <Image
              src={notFound}
              alt={"Woman wandering a vast desert on her own."}
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </div>
    </>
  );
}
