import { HeroCarousel } from "@/components/home/hero-carousel";
import { HeroFallback } from "@/components/home/hero-fallback";
import { PillarsSection } from "@/components/home/pillars-section";
import { PlatformsSection } from "@/components/home/platforms-section";
import { ScholarshipsSection } from "@/components/home/scholarships-section";
import { SegmentsSection } from "@/components/home/segments-section";
import { VideoSection } from "@/components/home/video-section";
import { getBanners } from "@/lib/notion/banners";

// acompanha o cache dos banners: Início/Fim do Notion entram em até 5 min
export const revalidate = 300;

export default async function HomePage() {
  const banners = await getBanners();

  return (
    <>
      {banners.length > 0 ? (
        <>
          <h1 className="sr-only">Colégio CPPEM — escola cristã, militarizada e preparatória em Caruaru-PE</h1>
          <HeroCarousel banners={banners} />
        </>
      ) : (
        <HeroFallback />
      )}
      <SegmentsSection />
      <PillarsSection />
      <PlatformsSection />
      <VideoSection showAboutLink />
      <ScholarshipsSection />
    </>
  );
}
