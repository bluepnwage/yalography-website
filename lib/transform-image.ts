const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function transformImage(transform: string, public_id: string, format: string) {
  return `https://res.cloudinary.com/${cloud_name}/image/upload/c_scale,${transform}/yalo-preview/${public_id}.${format}`;
}
