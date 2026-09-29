import type { Metadata } from 'next';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Disclosure } from '@/components/public-info/Disclosure';
import { PublicInfoHero } from '@/components/public-info/PublicInfoHero';

export const metadata: Metadata = {
  title: 'Публічна інформація — ЗІРКА, 4-й пров. Заводський, 2',
  description:
    "Розкриття інформації про об'єкт будівництва на 4-му пров. Заводському, 2 у Чернівцях: технічні характеристики, замовник, дозвіл, ідентифікатори майбутніх об'єктів нерухомості, умови придбання.",
};

export default function PublicInfoPage(): React.JSX.Element {
  return (
    <>
      <StickyHeader />
      <main>
        <PublicInfoHero />
        <Disclosure />
      </main>
      <SiteFooter />
    </>
  );
}
