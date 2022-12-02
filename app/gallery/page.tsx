import { PageIntro } from "@components/PageIntro";
import { Gallery } from "@components/gallery";

export default function GalleryPage() {
  return (
    <>
      <PageIntro>
        Very cool and <br />
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          inspiring title
        </span>
      </PageIntro>
      <Gallery />
    </>
  );
}
