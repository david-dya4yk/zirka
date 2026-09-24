import type { Metadata } from 'next';
import { Montserrat, Source_Code_Pro } from 'next/font/google';
import localFont from 'next/font/local';
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
  title: 'ЗІРКА — забудовник повного циклу, Чернівці',
  description:
    'ПВКФ «ЗІРКА» — будуємо самі від ділянки до здачі ключа. Власна земля, власна техніка, свої люди. ЖК на Хотинській у будівництві.',
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
