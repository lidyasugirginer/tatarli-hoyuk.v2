import Hero from "@/components/home/Hero";
import About from "@/components/home/about";
import NewsAndPublications from "@/components/home/newsandpublications";
import KizzuwatnaProject from "@/components/home/KizzuwatnaProject";

export default function EnglishHome() {
  return (
    <main>
      <Hero language="en" />
      <About language="en" />
      <KizzuwatnaProject language="en" />
      <NewsAndPublications language="en" />
    </main>
  );
}