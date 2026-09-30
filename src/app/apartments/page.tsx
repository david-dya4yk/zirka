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
import { HERO_IMAGE, HERO_LIT_IMAGE } from '@/lib/apartments';

export const metadata: Metadata = {
  title: 'Купити квартиру у Чернівцях — ЗІРКА',
  description:
    'Вільні 1-, 2- і 3-кімнатні квартири від забудовника ЗІРКА у Чернівцях: ЖК на Хотинській у будівництві та готові квартири у зданих ЖК. Нотаріальний договір і МОН з першого дня.',
};

export default function ApartmentsPage(): React.JSX.Element {
  const withLights = [HERO_IMAGE, HERO_LIT_IMAGE].every((src) =>
    existsSync(join(process.cwd(), 'public', src)),
  );

  return (
    <>
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
