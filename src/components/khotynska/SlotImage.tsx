import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import styles from './Khotynska.module.scss';

interface SlotImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string | undefined;
  priority?: boolean;
}

/** Cover image from /public, or a labelled placeholder until the file is added. */
export function SlotImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: SlotImageProps): React.JSX.Element {
  const exists = existsSync(join(process.cwd(), 'public', src));
  return (
    <div className={[styles.slot, className].filter(Boolean).join(' ')}>
      {exists ? (
        <Image src={src} alt={alt} fill sizes={sizes} preload={priority} />
      ) : (
        <span className={styles.slotPlaceholder}>{alt}</span>
      )}
    </div>
  );
}
