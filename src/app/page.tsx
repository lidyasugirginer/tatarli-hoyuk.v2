import Header from "@/components/layout/header";
import Hero from "@/components/home/Hero";
import About from "@/components/home/about";
import NewsAndPublications from "@/components/home/newsandpublications";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <NewsAndPublications />
      </main>

      <Footer />
    </>
  );
}