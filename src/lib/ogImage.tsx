// Share image (1200×630) for a route's opengraph-image.tsx: page photo, brand gradient, title.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const root = process.cwd();
const dataUrl = async (path: string, mime: string): Promise<string> =>
  `data:${mime};base64,${(await readFile(join(root, path))).toString('base64')}`;

export async function renderOgImage({
  kicker,
  title,
  /** Background photo in src/assets/og (1200×630). */
  photo,
}: {
  kicker: string;
  title: string;
  photo: string;
}): Promise<ImageResponse> {
  const [background, logo, black, medium] = await Promise.all([
    dataUrl(`src/assets/og/${photo}.jpg`, 'image/jpeg'),
    dataUrl('public/images/logo-ondark.png', 'image/png'),
    readFile(join(root, 'src/fonts/og/Montserrat-Black.ttf')),
    readFile(join(root, 'src/fonts/og/Montserrat-Medium.ttf')),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#15140f',
        fontFamily: 'Montserrat',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
      <img
        src={background}
        alt=""
        width={1200}
        height={630}
        style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          display: 'flex',
          background:
            'linear-gradient(90deg, rgba(15,14,11,0.95) 0%, rgba(15,14,11,0.85) 50%, rgba(15,14,11,0.35) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '56px 64px',
          color: '#fff',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
        <img src={logo} alt="" width={90} height={76} />
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 780 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#FFC003',
              marginBottom: 20,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 62,
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 6,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #FFC003, #FD9B00, #E8571B)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 500, opacity: 0.8 }}>
            Забудовник повного циклу · Чернівці · з 2005
          </div>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Montserrat', data: black, weight: 900, style: 'normal' },
        { name: 'Montserrat', data: medium, weight: 500, style: 'normal' },
      ],
    },
  );
}
