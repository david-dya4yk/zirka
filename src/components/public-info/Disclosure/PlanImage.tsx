import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import styles from './Disclosure.module.scss';

interface PlanImageProps {
  src: string;
  alt: string;
  /** Shown in the placeholder until the file is added to /public. */
  placeholder: string;
  /** `cover` crops to fill the frame (photos); `contain` shows the whole drawing (plans). */
  fit?: 'cover' | 'contain';
  /** CSS aspect-ratio for images whose proportions differ from the default frame. */
  ratio?: string | undefined;
  className?: string;
}

/**
 * Framed image from /public that degrades to a labelled placeholder while the file is missing,
 * so plans and progress photos can be dropped in later without touching code.
 */
export function PlanImage({
  src,
  alt,
  placeholder,
  fit = 'contain',
  ratio,
  className,
}: PlanImageProps): React.JSX.Element {
  const exists = existsSync(join(process.cwd(), 'public', src));

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {exists ? (
        // Drawings are unreadable at 520px — the frame opens the full-size file.
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.frameLink}
          aria-label={`${alt} — відкрити у повному розмірі`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            style={{ objectFit: fit }}
          />
        </a>
      ) : (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
    </div>
  );
}
