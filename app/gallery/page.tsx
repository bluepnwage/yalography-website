import { PageIntro } from "@components/PageIntro";
import { Gallery } from "@components/gallery";

export default function GalleryPage() {
  return (
    <>
      <PageIntro>
        Captivating Photos: <br /> A{" "}
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">Visual Journey</span>{" "}
        <br />
        Through Our Gallery
      </PageIntro>
      <Gallery />
    </>
  );
}
