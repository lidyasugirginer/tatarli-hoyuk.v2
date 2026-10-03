import Hero from "@/components/home/Hero";
import About from "@/components/home/about";
import NewsAndPublications from "@/components/home/newsandpublications";
import KizzuwatnaProject from "@/components/home/KizzuwatnaProject";

export default function Home() {
  return (
    <main>
      <Hero language="tr" />
      <About language="tr" />
      <KizzuwatnaProject language="tr" />
      <NewsAndPublications language="tr" />
    </main>
  );
}