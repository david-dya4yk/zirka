import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import {
  CtaSection,
  DocsSection,
  FaqSection,
  GuaranteesSection,
  HandoverSection,
  ProjectInfoHero,
  SafetySection,
  ServiceSection,
  TechSection,
} from '@/components/project-info/ProjectInfo';

export const metadata: Metadata = {
  title: 'Проектна інформація — ЗІРКА',
  description:
    'Документи на ЖК ПВКФ «ЗІРКА», технології будівництва, безпека, стан квартир при здачі, гарантії та відповіді на питання про МОН і договір.',
};

export default function ProjectInfoPage(): React.JSX.Element {
  return (
    <>
      <StickyHeader />
      <main>
        <ProjectInfoHero />
        <DocsSection />
        <TechSection />
        <SafetySection />
        <HandoverSection />
        <GuaranteesSection />
        <ServiceSection />
        <FaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
