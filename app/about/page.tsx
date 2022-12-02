import { Bio, SkillDetails, LogoCloud } from "@components/about";
import { PageIntro } from "@components/PageIntro";

export default function AboutPage() {
  return (
    <>
      <PageIntro>
        Capturing the moments that <br />
        <span className="text-transparent bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text">
          captivate your heart
        </span>
      </PageIntro>
      <Bio />
      <LogoCloud />
      <SkillDetails />
    </>
  );
}
