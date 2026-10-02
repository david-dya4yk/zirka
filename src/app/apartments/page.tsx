import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { ApartmentPlans } from '@/components/apartments/ApartmentPlans';
import { ApartmentsCallback } from '@/components/apartments/ApartmentsCallback';
import { ApartmentsCatalog } from '@/components/apartments/ApartmentsCatalog';
import { ApartmentsHero } from '@/components/apartments/ApartmentsHero';
import { FaqSection, SeoSection } from '@/components/apartments/ApartmentsInfo';
import { ProjectsSlider } from '@/components/apartments/ProjectsSlider';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { FAQ as APARTMENTS_FAQ, HERO_IMAGE, HERO_LIT_IMAGE } from '@/lib/apartments';
import { breadcrumbSchema, faqSchema, pageMetadata, PAGES } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMetadata(PAGES.apartments);

export default function ApartmentsPage(): React.JSX.Element {
  const withLights = [HERO_IMAGE, HERO_LIT_IMAGE].every((src) =>
    existsSync(join(process.cwd(), 'public', src)),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema('Обрати квартиру', PAGES.apartments.path),
          faqSchema(APARTMENTS_FAQ),
        ]}
      />
      <StickyHeader />
      <main>
        <ApartmentsHero withLights={withLights} />
        <ApartmentsCatalog />
        <ApartmentPlans />
        <ProjectsSlider />
        <SeoSection />
        <ApartmentsCallback />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
