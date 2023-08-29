declare namespace NodeJS {
  export interface ProcessEnv {
    VERCEL_ENV: "production" | "development" | "preview" | undefined;
    NEXT_PUBLIC_CLOUDINARY_PRESET: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    NEXT_PUBLIC_REVALIDATE_SECRET: strng;
  }
}
