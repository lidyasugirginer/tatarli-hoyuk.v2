import Hero from "@/components/home/Hero";
import About from "@/components/home/about";
import NewsAndPublications from "@/components/home/newsandpublications";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <NewsAndPublications />
    </main>
  );
}