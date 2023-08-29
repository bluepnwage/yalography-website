"use client";
import { createContext, useContext } from "react";

import type { Images } from "@prisma/client";
import type { SerializedImageFolder } from "@/lib/prisma";

export type ImageFoldersJoin = SerializedImageFolder & { Images: Images[] };

type GalleryProviderProps = {
  images: Images[];
  folders: ImageFoldersJoin[];
};

const GalleryContext = createContext<GalleryProviderProps | null>(null);

type PropTypes = {
  children: React.ReactNode;
} & GalleryProviderProps;

export function GalleryProvider({ children, ...props }: PropTypes) {
  return <GalleryContext.Provider value={props}>{children}</GalleryContext.Provider>;
}

export function useGallery() {
  return useContext(GalleryContext)!;
}
