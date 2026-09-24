import type { ReactNode } from 'react';
import styles from './Badge.module.scss';

type BadgeVariant = 'amber' | 'success' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = 'neutral' }: BadgeProps): React.JSX.Element {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}
