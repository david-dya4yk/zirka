import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyHeader } from '@/components/layout/StickyHeader';
import { ProjectsCatalog } from '@/components/projects/ProjectsCatalog';
import { ProjectsCta } from '@/components/projects/ProjectsCta';
import { ProjectsHero } from '@/components/projects/ProjectsHero';
import { PROJECTS } from '@/lib/projects';
import { breadcrumbSchema, pageMetadata, PAGES } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = pageMetadata(PAGES.projects);

export default function ProjectsPage(): React.JSX.Element {
  const imageAvailable = Object.fromEntries(
    PROJECTS.map((p) => [p.image, existsSync(join(process.cwd(), 'public', p.image))]),
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema('Проєкти', PAGES.projects.path)} />
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
