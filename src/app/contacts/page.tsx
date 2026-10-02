import type { Metadata } from 'next';
import { ContactsDirect } from '@/components/contacts/ContactsDirect';
import { ContactsHero } from '@/components/contacts/ContactsHero';
import { FindUsSection } from '@/components/contacts/FindUsSection';
import { ShowingSection } from '@/components/contacts/ShowingSection';
import { SocialsSection } from '@/components/contacts/SocialsSection';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { breadcrumbSchema, organizationSchema, pageMetadata, PAGES } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMetadata(PAGES.contacts);

export default function ContactsPage(): React.JSX.Element {
  return (
    <>
      <JsonLd data={[breadcrumbSchema('Контакти', PAGES.contacts.path), organizationSchema()]} />
      <StickyHeader />
      <main>
        <ContactsHero />
        <ContactsDirect />
        <FindUsSection />
        <ShowingSection />
        <SocialsSection />
      </main>
      <SiteFooter />
    </>
  );
}
