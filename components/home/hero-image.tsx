import villa from "@/public/slideshow/villa-lg.webp";
import { BlurImage } from "../blur-image";

type PropTypes = {
  children: React.ReactNode;
};

export function BackgroundImage({ children }: PropTypes) {
  return (
    <div
      className={`bg-black overflow-hidden mb-20 lg:mb-48  relative flex flex-col justify-center [height:calc(100vh-64px)]  
      border-b border-zinc-200  duration-200 ease-out dark:border-zinc-700`}
    >
      <BlurImage priority src={villa} placeholder="blur" alt="" fill className="opacity-20 object-cover" />
      {children}
    </div>
  );
}
