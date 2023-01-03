"use client";
import { createContext, useContext } from "react";

import type { Images } from "@prisma/client";

const GalleryContext = createContext<Images[] | null>(null);

type PropTypes = {
  children: React.ReactNode;
  images: Images[];
};

export function GalleryProvider({ images, children }: PropTypes) {
  return <GalleryContext.Provider value={images}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  return useContext(GalleryContext)!;
}
