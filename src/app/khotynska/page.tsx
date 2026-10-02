import type { Metadata } from 'next';
import { KhotynskaHero } from '@/components/khotynska/KhotynskaHero';
import {
  AboutSection,
  BuySection,
  ContactSection,
  DocsSection,
  GallerySection,
  LocationSection,
  PlansSection,
  ProgressSection,
  TechSection,
  WhySection,
} from '@/components/khotynska/Sections';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { breadcrumbSchema, khotynskaSchema, pageMetadata, PAGES } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMetadata(PAGES.khotynska);

export default function KhotynskaPage(): React.JSX.Element {
  return (
    <>
      <JsonLd
        data={[breadcrumbSchema('ЖК на Хотинській', PAGES.khotynska.path), khotynskaSchema()]}
      />
      <StickyHeader />
      <main>
        <KhotynskaHero />
        <AboutSection />
        <WhySection />
        <GallerySection />
        <PlansSection />
        <TechSection />
        <LocationSection />
        <ProgressSection />
        <BuySection />
        <DocsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
