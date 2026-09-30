import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { ProjectsCatalog } from '@/components/projects/ProjectsCatalog';
import { ProjectsCta } from '@/components/projects/ProjectsCta';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { PROJECTS } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Проєкти — ЗІРКА, Чернівці',
  description:
    'Житлові комплекси та громадські обʼєкти ПВКФ «ЗІРКА»: ЖК на Хотинській у будівництві, 6 зданих ЖК, учбовий корпус БНУ і клуб «Рогізна».',
};

export default function ProjectsPage(): React.JSX.Element {
  const imageAvailable = Object.fromEntries(
    PROJECTS.map((p) => [p.image, existsSync(join(process.cwd(), 'public', p.image))]),
  );

  return (
    <>
      <StickyHeader />
      <main>
        <ProjectsHero />
        <ProjectsCatalog imageAvailable={imageAvailable} />
        <ProjectsCta />
      </main>
      <SiteFooter />
    </>
  );
}
