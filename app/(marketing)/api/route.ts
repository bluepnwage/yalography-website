import { listImages } from "@/lib/firebase/storage";

export async function GET() {
  const img = await listImages();
  return new Response(JSON.stringify({ img }));
}
