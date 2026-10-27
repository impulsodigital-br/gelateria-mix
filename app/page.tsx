import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LocationSection } from "@/components/LocationSection";
import { MenuSection } from "@/components/MenuSection";
import { ReviewsSection } from "@/components/ReviewsSection";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <About />
        <GallerySection />
        <ReviewsSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
