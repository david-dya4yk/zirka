import type { Metadata } from 'next';
import { BuildSection } from '@/components/home/BuildSection';
import { ContactSection } from '@/components/home/ContactSection';
import { HeroSection } from '@/components/home/HeroSection';
import { OffersSection } from '@/components/home/OffersSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StatsSection } from '@/components/home/StatsSection';
import { organizationSchema, pageMetadata, PAGES, websiteSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMetadata(PAGES.home);

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
