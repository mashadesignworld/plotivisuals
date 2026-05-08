import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullwidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullwidth = false,
  className = '',
  children,
  ...props
}) => {
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const fullwidthClass = fullwidth ? 'btn--fullwidth' : '';

  const combinedClassName = [
    'btn',
    variantClass,
    sizeClass,
    fullwidthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
