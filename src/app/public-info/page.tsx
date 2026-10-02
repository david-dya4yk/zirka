import type { Metadata } from 'next';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Disclosure } from '@/components/public-info/Disclosure';
import { PublicInfoHero } from '@/components/public-info/PublicInfoHero';
import { breadcrumbSchema, pageMetadata, PAGES } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMetadata(PAGES.publicInfo);

export default function PublicInfoPage(): React.JSX.Element {
  return (
    <>
      <JsonLd data={breadcrumbSchema('Публічна інформація', PAGES.publicInfo.path)} />
      <StickyHeader />
      <main>
        <PublicInfoHero />
        <Disclosure />
      </main>
      <SiteFooter />
    </>
  );
}
