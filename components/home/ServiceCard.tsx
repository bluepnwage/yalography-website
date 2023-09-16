"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

import maternity1 from "@/public/services/DSC00283-Recovered-lg.webp";
import maternity2 from "@/public/services/DSC08217 copy-lg.webp";
import maternity3 from "@/public/services/thumb-lg.webp";
import maternity4 from "@/public/services/DSC00315-Recovered-Recovered copy-lg.webp";
import maternity5 from "@/public/services/DSC08341 copy-lg.webp";
import maternity6 from "@/public/services/DSC00283-Recovered-lg.webp";

import portrait1 from "@/public/services/portrait/gsigxzfi3kcm4l4p4gul-lg.webp";
import portrait2 from "@/public/services/portrait/lqpu4gdtydig8zokc3if-lg.webp";
import portrait3 from "@/public/services/portrait/qvdgwwtziuqlxakxinz7-lg.webp";
import portrait4 from "@/public/services/portrait/w63huqak6ywi6nm8fo30-lg.webp";
import portrait5 from "@/public/services/portrait/of8hydqvsi7zhmvnchi9-lg.webp";
import portrait6 from "@/public/services/portrait/rrtno8lakqedpdwyltof-lg.webp";

import commercial1 from "@/public/services/commercial/fdt6bplxqsbwsf8k5g4k-lg.webp";
import commercial2 from "@/public/services/commercial/Photo (23)-lg.webp";
import commercial3 from "@/public/services/commercial/Photo (20)-lg.webp";
import commercial4 from "@/public/services/commercial/DSC01911-lg.webp";
import commercial5 from "@/public/services/commercial/DSC00804-lg.webp";
import commercial6 from "@/public/services/commercial/wc9zt3ivqr0c1pengjfl-lg.webp";

import { ServicesGallery } from "./services-gallery";
import { Card, Title } from "@aomdev/ui";
import Link from "next/link";
import { buttonStyles } from "@aomdev/ui/src/button/styles";

const maternity = [maternity1, maternity2, maternity3, maternity4, maternity5, maternity6];
const portrait = [portrait1, portrait2, portrait3, portrait4, portrait5, portrait6];
const commercial = [commercial1, commercial2, commercial3, commercial4, commercial5, commercial6];

const allImages = {
  maternity,
  portrait,
  commercial
};

const variants: Variants = {
  enter: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

export function Services({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<keyof typeof allImages>("maternity");

  useEffect(() => {
    const interval = setInterval(() => {
      paginate();
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  const paginate = useCallback(() => {
    setActive(prev => {
      switch (prev) {
        case "maternity": {
          return "portrait";
        }
        case "portrait": {
          return "commercial";
        }
        case "commercial": {
          return "maternity";
        }
        default: {
          return "maternity";
        }
      }
    });
  }, []);

  return (
    <>
      <div className="basis-2/3">
        <AnimatePresence>
          <header className="space-y-2 mb-4 ">
            {children}
            <Title
              order={3}
              className="font-heading font-medium text-5xl text-gray-900 dark:text-gray-50 pb-14 relative overflow-hidden"
            >
              I specialize in <br />{" "}
              <motion.span className="  absolute">
                <motion.span
                  key={active}
                  transition={{ duration: 1 }}
                  exit={"exit"}
                  variants={variants}
                  initial="enter"
                  animate="visible"
                  className="capitalize text-primary-300"
                >
                  {active}
                </motion.span>{" "}
                shoots
              </motion.span>
            </Title>
          </header>
        </AnimatePresence>

        <p className="leading-loose text-lg text-gray-700 dark:text-gray-200  mb-6">
          Capturing the moments that matter most. As a versatile photographer, I specialize in maternity
          sessions that celebrate the beauty of pregnancy, create stunning and timeless portrait photography
          that tells your unique story, and deliver impactful commercial shots that elevate your brand. With a
          passion for creativity and an eye for detail, I&apos;m dedicated to delivering memorable images that
          capture the essence of every occasion. From intimate maternity sessions to dynamic commercial
          projects and everything in between, I&apos;m here to bring your vision to life through the lens.
        </p>
        <Link href={"/bookings"} className={buttonStyles({ className: "w-fit" })}>
          Book a session
        </Link>
      </div>
      <div className="relative    gap-6 mt-10  container mx-auto grow ">
        <ServicesGallery photos={allImages[active]}>
          <Card className=" basis-1/4 grow flex flex-col gap-6 items-center justify-center text-lg  text-center">
            <p className="text-gray-600 dark:text-gray-200">Over</p>
            <div>
              <p className="font-heading font-medium text-4xl text-primary-500 dark:text-primary-300 mb-3">
                500+
              </p>
              <p className="first-letter:capitalize text-gray-600 dark:text-gray-200">
                {active} shoots completed
              </p>
            </div>
          </Card>
        </ServicesGallery>
      </div>
    </>
  );
}
