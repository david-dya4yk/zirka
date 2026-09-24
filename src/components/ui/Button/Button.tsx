import type { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'outline' | 'outlineOnDark' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders an `<a>` when set, otherwise a `<button>`. */
  href?: string;
  type?: 'button' | 'submit';
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  className,
}: ButtonProps): React.JSX.Element {
  const cls = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');

  if (href !== undefined) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}
