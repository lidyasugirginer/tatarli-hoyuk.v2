import Hero from "@/components/home/Hero";
import About from "@/components/home/about";
import LatestPublications from "@/components/home/latest-publications";

export default function EnglishHomePage() {
  return (
    <>
      <Hero language="en" />
      <About language="en"/>
      <LatestPublications />
    </>
  );
}