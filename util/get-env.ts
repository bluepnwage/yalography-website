export function getEnv() {
  return process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "development" ? process.env.VERCEL_ENV : "dev";
}
