import * as React from 'react';
import './Card.css';

export type CardVariant = 'default' | 'elevated' | 'outline' | 'accent';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', interactive, className = '', children, ...rest }, ref) => {
    const classes = [
      'card',
      variant !== 'default' ? `card--${variant}` : '',
      interactive ? 'card--interactive' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...p }) => (
  <div className={`card__header ${className}`} {...p} />
);
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = '', ...p }) => (
  <h3 className={`card__title ${className}`} {...p} />
);
export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...p }) => (
  <div className={`card__body ${className}`} {...p} />
);
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = '', ...p }) => (
  <div className={`card__footer ${className}`} {...p} />
);

export default Card;
