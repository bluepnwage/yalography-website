declare namespace NodeJS {
  export interface ProcessEnv {
    VERCEL_ENV: "production" | "development" | "preview" | undefined;
  }
}
