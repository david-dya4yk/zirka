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

export const metadata: Metadata = {
  title: 'ЖК на Хотинській — ЗІРКА, Чернівці',
  description:
    'Восьмиповерховий будинок на дві секції з підземним паркінгом: 80 квартир, 4-й пров. Заводський, 2, Чернівці. Планування, хід будівництва, умови придбання.',
};

export default function KhotynskaPage(): React.JSX.Element {
  return (
    <>
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
