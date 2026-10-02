import type { Metadata, Viewport } from 'next';
import { Montserrat, Source_Code_Pro } from 'next/font/google';
import localFont from 'next/font/local';
import {
  DEFAULT_DESCRIPTION,
  PAGES,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
  TITLE_SUFFIX,
} from '@/lib/seo';
import '@/styles/globals.scss';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code',
  subsets: ['latin', 'cyrillic'],
});

const eurostile = localFont({
  variable: '--font-eurostile',
  src: '../fonts/EurostileExtendedBlack.ttf',
  weight: '900',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PAGES.home.title, template: `%s${TITLE_SUFFIX}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'ПВКФ «Зірка»', url: SITE_URL }],
  creator: 'ПВКФ «Зірка»',
  publisher: 'ПВКФ «Зірка»',
  category: 'real estate',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: SITE_NAME,
    title: PAGES.home.title,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html
      lang="uk"
      className={`${montserrat.variable} ${sourceCodePro.variable} ${eurostile.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
