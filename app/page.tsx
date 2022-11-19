import { Hero, AboutSection, Services, ProjectList, Contact } from "@components/home";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Services />
      <ProjectList />
      <Contact />
    </main>
  );
}
