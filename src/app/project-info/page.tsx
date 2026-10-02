import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import {
  CtaSection,
  DocsSection,
  FaqSection,
  HandoverSection,
  ProjectInfoHero,
  SafetySection,
  ServiceSection,
  TechSection,
} from '@/components/project-info/ProjectInfo';
import { breadcrumbSchema, faqSchema, pageMetadata, PAGES } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { FAQ as PROJECT_INFO_FAQ } from '@/lib/projectInfo';

export const metadata: Metadata = pageMetadata(PAGES.projectInfo);

export default function ProjectInfoPage(): React.JSX.Element {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema('Проектна інформація', PAGES.projectInfo.path),
          faqSchema(PROJECT_INFO_FAQ),
        ]}
      />
      <StickyHeader />
      <main>
        <ProjectInfoHero />
        <DocsSection />
        <TechSection />
        <SafetySection />
        <HandoverSection />
        <ServiceSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
