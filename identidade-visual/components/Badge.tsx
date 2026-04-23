import * as React from 'react';
import './Badge.css';

export type BadgeVariant = 'neutral' | 'ai' | 'brand' | 'coral' | 'warn' | 'success';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Exibe um dot pulsante ao lado do texto (para estados live). */
  pulse?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'neutral', pulse, className = '', children, ...rest }, ref) => {
    const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ');
    return (
      <span ref={ref} className={classes} {...rest}>
        {pulse && <span className="badge__dot" aria-hidden />}
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
export default Badge;
