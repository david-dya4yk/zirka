import { BuildSection } from '@/components/home/BuildSection';
import { ContactSection } from '@/components/home/ContactSection';
import { HeroSection } from '@/components/home/HeroSection';
import { OffersSection } from '@/components/home/OffersSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { SiteFooter } from '@/components/home/SiteFooter';
import { StatsSection } from '@/components/home/StatsSection';

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <main>
        <HeroSection />
        <StatsSection />
        <ProjectsSection />
        <BuildSection />
        <OffersSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
