import type { Metadata } from 'next';
import { ContactsDirect } from '@/components/contacts/ContactsDirect';
import { ContactsHero } from '@/components/contacts/ContactsHero';
import { FindUsSection } from '@/components/contacts/FindUsSection';
import { ShowingSection } from '@/components/contacts/ShowingSection';
import { SocialsSection } from '@/components/contacts/SocialsSection';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteNav } from '@/components/layout/SiteNav';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'Контакти — ЗІРКА, Чернівці',
  description:
    'Офіс продажу ПВКФ «ЗІРКА»: вул. Зоряна, 4, Чернівці. Пн–Пт 10:00–18:00. Телефони, месенджери, запис на показ ЖК.',
};

export default function ContactsPage(): React.JSX.Element {
  return (
    <>
      <div className={styles.navBar}>
        <SiteNav />
      </div>
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
