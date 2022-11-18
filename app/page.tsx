import { Hero, AboutSection, Services, Projects, Contact } from "@components/home";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
